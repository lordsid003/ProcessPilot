from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel, Field
from typing import List

# Business Chatbot: Idea -> Taglines, Advertisement Info, Available web domains, marketing schemes and competitors
idea_prompt = PromptTemplate(
    input_variables=["category", "idea"],
    template=
    """
        You are a business counsellor for {category}. Generate organization names for this business idea: {idea}
    """,
    validate_template=True
)

# Pipelining: User -> Sequential Chain -> Output -> Sequential Chain (before response generation)
data_prompt = PromptTemplate(
    input_variables=["name", "category"],
    template=
    """
        Based on the business name: {name} for this industry: {category}, provide a detailed data with the following sections:\n"
        Business Taglines:\n
        - List of taglines\n
        Web Domains:\n
        - List of web domains\n  
        Marketing strategies:\n
        - List of marketing strategies\n
        Competitors:\n
        - List of market competitors\n
        Generate exactly 4 items in each category
    """,
    validate_template=True
)

# Stock information extraction for a company
stock_prompt = PromptTemplate(
    input_variables=["company_name", "stock_info"],
    template=
    """
        You are an excellent financial analyst. Summarize the following stock information for {company_name} "
        in plain language with key insights: {stock_info}". 
        Also generate 4 points for these.
        - Give list of recent stock prices\n.
        - Also provide insights useful for the company\n.
    """,
    validate_template=True
)

mail_prompt = PromptTemplate(
    input_variables=["company_info"],
    template=
    """
        You are a marketing professional handling custom mail generation. Generate HTML for an email with
        relevant information and styling for company information: {company_info}. Make sure the mail is
        stylized properly and looks professional.
    """
)

class IdeaModel(BaseModel):
    name: str = Field("Business Name:")

class DataModel(BaseModel):
    taglines: List[str] = Field("List of taglines:")
    domains: List[str] = Field("List of web domains:")
    strats: List[str] = Field("List of marketing strategies:")
    comp: List[str] = Field("List of competitors:")

class FormatModel(BaseModel):
    stock_info: str = Field("summary: ")
    stock_price: List[str] = Field("Stock prices: ")
    insights: List[str] = Field("Insights: ")

class MailModel(BaseModel):
    mail: str = Field("mail: ")