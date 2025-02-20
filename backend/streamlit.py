import streamlit as st
from model import Model

model = Model()

tags = {
    "taglines": "Taglines",
    "domains": "Web Domains",
    "strats": "Marketing Strategies",
    "comp": "Competitors"
}

st.set_page_config(page_title="AI-Powered Business & Stock Insights", layout="wide")
st.title("🚀 AI-Powered Business & Stock Insights")

menu = ["📊 Stock Summary", "💡 Business Idea Generator", "📧 Custom Email Generator"]
choice = st.sidebar.radio("🔍 Choose an option", menu)

if choice == "📊 Stock Summary":
    st.header("📊 Stock Information & Summary")
    st.write("Enter a company name to get an AI-generated stock summary with key insights.")

    company_name = st.text_input("🏢 Enter Company Name", placeholder="E.g., Tesla, Microsoft, Apple")

    if st.button("🔍 Generate Summary"):
        if company_name:
            summary = model.generate_stock_summary(company_name)
            if summary:
                st.subheader("📌 Stock Summary")
                st.write(summary)
            else:
                st.error("⚠️ Failed to fetch stock summary. Please try again.")
        else:
            st.warning("⚠️ Please enter a company name to proceed.")

elif choice == "💡 Business Idea Generator":
    st.header("💡 Generate Business Insights")
    st.write("Enter your business details below to generate AI-driven insights!")

    category = st.text_input("📌 Enter Business Category", placeholder="E.g., Fashion, Technology, Food")
    idea = st.text_input("💡 Enter Business Idea", placeholder="E.g., AI-powered clothing recommendations")

    if st.button("✨ Generate Insights"):
        if category and idea:
            response, business_name = model.generate_content(category, idea)

            if response and business_name:
                st.subheader("📢 Generated Business Insights")
                st.markdown(f"<h2 style='color:#d32f2f; font-size:24px;'>{business_name.name}</h2>", unsafe_allow_html=True)

                # Display structured insights
                for insight in response:
                    st.subheader(f"{tags[insight[0]]}")
                    for res in insight[1]:
                        st.markdown(f"- {res}")

            else:
                st.error("⚠️ Failed to generate business insights. Please try again.")

        else:
            st.warning("⚠️ Please enter both a Business Category and an Idea to proceed.")

elif choice == "📧 Custom Email Generator":
    st.header("📧 Generate Custom Business Email")
    st.write("Enter your company details below to generate a professional business email.")

    company_info = st.text_area("🏢 Enter Company Information", placeholder="Provide details about your company, products, or services.")

    if st.button("📨 Generate Email"):
        if company_info:
            email = model.generate_custom_mail(company_info)

            if email:
                st.subheader("📜 Generated Email Preview")
                st.markdown(email, unsafe_allow_html=True)  # Renders as actual HTML
            else:
                st.error("⚠️ Failed to generate email. Please try again.")

        else:
            st.warning("⚠️ Please enter company information to proceed.")
