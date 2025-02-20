import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from tavily import TavilyClient
from config import stock_prompt, idea_prompt, data_prompt, mail_prompt, FormatModel, IdeaModel, DataModel, MailModel

load_dotenv()

class Model(object):
    def __init__(self) -> None:
        self.llm = ChatGroq(
            temperature=0.8,
            model="llama-3.1-8b-instant",
            api_key=os.getenv("GROQ_API_KEY")
        )
        self.client = TavilyClient(
            api_key=os.getenv("TAVILY_API_KEY")
        )
    
    def get_stock_info(self, company_name: str):
        try:
            query = f"Stock information for company: {company_name}"
            response = self.client.search(
                query=query,
                topic="news",
                include_answer="basic"
            )
            return response
        except Exception as e:
            print(f"An error occurred: {e}")

    def generate_stock_summary(self, company_name: str):
        stock_info = self.get_stock_info(company_name)
        # Chain Initialization (Resources not allocated)
        sequential_idea_chain = stock_prompt | self.llm.with_structured_output(FormatModel)
        try:
            data_dict = {"company_name": company_name, "stock_info": stock_info}
            response = sequential_idea_chain.invoke(data_dict)
            return response
        except Exception as e:
            print(f"An error occurred: {e}")

    def generate_content(self, category: str, idea: str):
        sequential_idea_chain = idea_prompt | self.llm.with_structured_output(IdeaModel)
        sequential_data_chain = data_prompt | self.llm.with_structured_output(DataModel)
        try:
            idea_dict = {"category": category, "idea": idea}
            business_name = sequential_idea_chain.invoke(idea_dict)
            # Pipelining
            data_dict = {"category": category, "name": business_name.name}
            response = sequential_data_chain.invoke(data_dict)
            return response, business_name
        except Exception as e:
            print(f"An error occurred: {e}")

    def generate_custom_mail(self, company_info: str):
        sequential_chain = mail_prompt | self.llm.with_structured_output(MailModel)
        try:
            data_dict = {"company_info": company_info}
            mail = sequential_chain.invoke(data_dict)
            return mail.mail
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    model = Model()
    company = "Alphabet Inc." 
    company_info = "A custom watch company inspired by anime characters"
    try:
        summary = model.generate_stock_summary(company)
        print("Stock Summary:")
        for item in summary:
            print(f"{item[0]}: {item[1]}")
        mail = model.generate_custom_mail(company_info=company_info)
        print(mail)
    except Exception as e:
        print(f"An error occurred: {e}")
