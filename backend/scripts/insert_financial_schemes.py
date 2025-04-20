from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["OneNest"]
f_schemes = db["financial_schemes"]

schemes = [
    {
        "title": "PMGDISHA (Pradhan Mantri Gramin Digital Saksharta Abhiyan)",
        "description": "Provides digital literacy training to rural women and families, particularly targeting single mothers to empower them through technology.",
        "eligibility": "All women and rural families.",
        "benefits": "Empowerment through digital skills, access to online services, and improved employability.",
        "application_process": "Interested candidates can apply through PMGDISHA centers.",
        "tags": ["skill development", "digital literacy", "women empowerment"],
        "official_link": "https://pmgdisha.in/",
        "region": "Rural Areas"
    },
    {
        "title": "Beti Bachao Beti Padhao Scheme",
        "description": "Provides financial support to families, particularly single mothers, for the education and safety of girl children.",
        "eligibility": "Families with girl children.",
        "benefits": "Financial support, health, and education initiatives for girls.",
        "application_process": "Apply at government offices or online through the Ministry of Women and Child Development.",
        "tags": ["women empowerment", "education", "child welfare"],
        "official_link": "https://wcd.nic.in/",
        "region": "Nationwide"
    },
    {
        "title": "National Creche Scheme for Children",
        "description": "Supports the establishment of crèches and daycare centers for children of working parents, particularly helping single mothers.",
        "eligibility": "Children up to the age of 6 years, with priority to single mothers.",
        "benefits": "Affordable childcare, enabling single mothers to work or pursue education.",
        "application_process": "Apply through local district offices or child welfare centers.",
        "tags": ["childcare", "working parents", "single mothers"],
        "official_link": "https://wcd.nic.in/",
        "region": "Nationwide"
    },
    {
        "title": "Indira Gandhi Matritva Sahyog Yojana (IGMSY)",
        "description": "Provides maternity benefits to pregnant and lactating mothers, especially helpful to single mothers in need of financial support.",
        "eligibility": "Pregnant and lactating women (especially single mothers).",
        "benefits": "Financial assistance for pregnant women to ensure healthy pregnancies.",
        "application_process": "Apply through local Anganwadi centers or district health offices.",
        "tags": ["maternity benefits", "financial aid", "women health"],
        "official_link": "https://wcd.nic.in/",
        "region": "Nationwide"
    },
    {
        "title": "Bihar Single Woman Pension Scheme",
        "description": "Provides a monthly pension to single women, including widows and deserted wives.",
        "eligibility": "Women who are single (divorced, widowed, or abandoned).",
        "benefits": "Monthly financial assistance.",
        "application_process": "Apply through the Bihar state government’s welfare office or online portal.",
        "tags": ["pension", "single women", "financial support"],
        "official_link": "https://www.bihar.gov.in/",
        "region": "Bihar"
    },
    {
        "title": "Swadhar Greh Scheme",
        "description": "Offers shelter, food, and rehabilitation to single parents in distress, including widows, abandoned women, and single fathers.",
        "eligibility": "Women and men in distress, including single parents.",
        "benefits": "Shelter, food, rehabilitation, and counseling services.",
        "application_process": "Apply through the Ministry of Women and Child Development or local welfare offices.",
        "tags": ["shelter", "rehabilitation", "women welfare"],
        "official_link": "https://wcd.nic.in/",
        "region": "Nationwide"
    },
    {
        "title": "Kalyani Scheme (West Bengal)",
        "description": "A state scheme offering financial assistance to single parents (widowed, divorced, or deserted) in the form of a stipend.",
        "eligibility": "Widowed, divorced, or abandoned single parents.",
        "benefits": "Financial support to single parents to assist in their daily living expenses.",
        "application_process": "Apply through the West Bengal State Social Welfare Department.",
        "tags": ["financial support", "single parents", "state welfare"],
        "official_link": "https://wcdwb.gov.in/",
        "region": "West Bengal"
    },
    {
        "title": "Maternity Benefit Programme (Maternity Leave & Benefits)",
        "description": "Offers paid maternity leave for working parents, helping single mothers or fathers in balancing work and family responsibilities.",
        "eligibility": "Employed single mothers or fathers (in applicable sectors).",
        "benefits": "Paid maternity leave and job protection.",
        "application_process": "Apply through the employer and government portals.",
        "tags": ["maternity benefits", "paid leave", "working parents"],
        "official_link": "https://www.labour.gov.in/",
        "region": "Nationwide"
    },
    {
        "title": "Rajasthan Ujjwala Yojana",
        "description": "Provides free LPG connections to low-income families, including those headed by single parents, to improve household health.",
        "eligibility": "Low-income families, especially those headed by single parents.",
        "benefits": "Free LPG connections, improved cooking facilities.",
        "application_process": "Apply through local gas agencies or Rajasthan government portal.",
        "tags": ["women’s health", "energy", "household support"],
        "official_link": "https://www.pmujjwalayojana.com/",
        "region": "Rajasthan"
    },
    {
        "title": "Swadhar Greh Scheme (For Shelter)",
        "description": "Provides shelter, food, and rehabilitation services for women in difficult circumstances, including single mothers and women survivors of violence.",
        "eligibility": "Single women in need of shelter.",
        "benefits": "Emergency shelter, food, legal aid, and vocational training.",
        "application_process": "Apply through local welfare centers or district social welfare offices.",
        "tags": ["shelter", "women in crisis", "rehabilitation"],
        "official_link": "https://wcd.nic.in/",
        "region": "Nationwide"
    }
]


f_schemes.insert_many(schemes)
print("✅ Schemes inserted successfully.")
