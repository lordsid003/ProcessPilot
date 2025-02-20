from flask import Flask, request, json, jsonify
from flask_cors import CORS
from model import Model

app = Flask(__name__)
CORS(app)
model = Model()

@app.route("/", methods=["GET"])
def home():
    return """
        <h2>ProcessPilot Server</h2>
        <p>Process Automation tool for businesses</p>
    """

@app.route("/stock_info", methods = ["POST"])
def stock_info():
    company_name: str = request.json.get("company_name")
    if not company_name:
        return jsonify({"error": "Missing idea parameter"}), 400
    
    response = model.get_stock_info(company_name=company_name)
    return jsonify({"response": response}), 200

@app.route("/stock_summary", methods = ["POST"])
def generate_stock_summary():
    company_name: str = request.json.get("company_name")
    if not company_name:
        return jsonify({"error": "Missing idea parameter"}), 400
    
    response = model.generate_stock_summary(company_name=company_name)
    return jsonify({
        "response": 
        {
            "stock_info": response.stock_info,
            "stock_price": response.stock_price,
            "insights": response.insights
        }
    }), 200

@app.route("/insights", methods = ["POST"])
def generate_insights():
    category: str = request.json.get("category")
    idea: str = request.json.get("idea")
    if not category or not idea:
        return jsonify({"error": "Missing idea parameter"}), 400
    
    response, business_name = model.generate_content(category=category, idea=idea)
    return jsonify({
        "response": 
        {
            "name": business_name.name,
            "taglines": response.taglines,
            "domains": response.domains,
            "strats": response.strats,
            "comp": response.comp
        }
    }), 200

@app.route("/custom_mail", methods = ["POST"])
def generate_custom_mail():
    company_info: str = request.json.get("company_info")
    if not company_info:
        return jsonify({"error": "Missing idea parameter"}), 400
    
    response = model.generate_custom_mail(company_info=company_info)
    return jsonify({"response": response}), 200

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)