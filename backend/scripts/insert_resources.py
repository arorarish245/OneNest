from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["OneNest"]
resources = db["resources"]

data = [
    # 🏛️ 1. Legal Assistance
    {
        "title": "NALSA - Free Legal Aid",
        "description": "Provides free legal services to eligible women, children, and the underprivileged.",
        "type": "Legal Assistance",
        "link": "https://nalsa.gov.in/",
        "tags": ["Free", "Govt", "Verified"],
        "icon": "⚖️"
    },
    {
        "title": "National Women’s Helpline - 181",
        "description": "Call 181 for emergency legal or psychological help for women in distress.",
        "type": "Legal Assistance",
        "link": "tel:181",
        "tags": ["Helpline", "Women"],
        "icon": "📞"
    },
    {
        "title": "Domestic Violence Helpline - 1091",
        "description": "Dedicated helpline for women facing domestic violence across India.",
        "type": "Legal Assistance",
        "link": "tel:1091",
        "tags": ["Helpline", "Domestic Violence"],
        "icon": "🚨"
    },
    {
        "title": "Legal Awareness Portal - MyGov",
        "description": "A government platform providing legal rights information and awareness.",
        "type": "Legal Assistance",
        "link": "https://www.mygov.in/",
        "tags": ["Awareness", "Legal"],
        "icon": "📜"
    },
    {
        "title": "National Commission for Women (NCW)",
        "description": "Handles complaints and provides guidance on women's rights issues.",
        "type": "Legal Assistance",
        "link": "http://ncw.nic.in/",
        "tags": ["Women", "Rights"],
        "icon": "👩‍⚖️"
    },

    # 🧠 2. Mental Health Support
    {
        "title": "iCall - Mental Health Helpline",
        "description": "Confidential mental health support by TISS for emotional distress.",
        "type": "Mental Health Support",
        "link": "https://icallhelpline.org/",
        "tags": ["Free", "Mental Health"],
        "icon": "🧠"
    },
    {
        "title": "Snehi NGO",
        "description": "A non-profit providing free counseling and emotional support services.",
        "type": "Mental Health Support",
        "link": "http://snehi.org/",
        "tags": ["NGO", "Counseling"],
        "icon": "❤️"
    },
    {
        "title": "Mindhouse - Meditation App",
        "description": "Guided meditation and relaxation techniques to improve mental well-being.",
        "type": "Mental Health Support",
        "link": "https://www.mindhouse.com/",
        "tags": ["Meditation", "Self-care"],
        "icon": "🧘‍♂️"
    },
    {
        "title": "Headspace (India Version)",
        "description": "Popular meditation and stress relief app tailored for Indian users.",
        "type": "Mental Health Support",
        "link": "https://www.headspace.com/",
        "tags": ["App", "Stress Relief"],
        "icon": "🌿"
    },
    {
        "title": "AASRA - Suicide Prevention Helpline",
        "description": "24x7 helpline for suicide prevention and emotional distress support.",
        "type": "Mental Health Support",
        "link": "https://www.aasra.info/",
        "tags": ["Helpline", "Crisis Support"],
        "icon": "📞"
    },

    # 👩‍💼 3. Job Opportunities
    {
        "title": "Sheroes",
        "description": "A career platform for women providing job opportunities and community support.",
        "type": "Job Opportunities",
        "link": "https://sheroes.com/",
        "tags": ["Women", "Career"],
        "icon": "💼"
    },
    {
        "title": "JobsForHer",
        "description": "Helping women restart their careers after a break with job listings and mentorship.",
        "type": "Job Opportunities",
        "link": "https://www.jobsforher.com/",
        "tags": ["Career", "Women"],
        "icon": "🚀"
    },
    {
        "title": "HerSecondInnings",
        "description": "A job portal dedicated to women re-entering the workforce.",
        "type": "Job Opportunities",
        "link": "https://www.hersecondinnings.com/",
        "tags": ["Women", "Jobs"],
        "icon": "👩‍💼"
    },
    {
        "title": "Remote OK - Remote Jobs",
        "description": "Find remote job opportunities across various industries worldwide.",
        "type": "Job Opportunities",
        "link": "https://remoteok.io/",
        "tags": ["Remote", "Jobs"],
        "icon": "🌍"
    },
    {
        "title": "Zety Resume Builder",
        "description": "Free resume-building tool to create professional CVs easily.",
        "type": "Job Opportunities",
        "link": "https://zety.com/resume-builder",
        "tags": ["Resume", "Free"],
        "icon": "📄"
    },

    #  🧒 4. Childcare & Education
    {
        "title": "CBSE Single Girl Child Scholarship",
        "description": "Scholarship program for single girl children in CBSE schools.",
        "type": "Childcare & Education",
        "link": "https://cbse.gov.in/",
        "tags": ["Scholarship", "Education"],
        "icon": "🎓"
    },
    {
        "title": "Government Daycare Centers (ICDS)",
        "description": "Affordable childcare facilities under the Integrated Child Development Scheme.",
        "type": "Childcare & Education",
        "link": "https://wcd.nic.in/icds",
        "tags": ["Government", "Daycare"],
        "icon": "🏫"
    },
    {
        "title": "Buddy4Study - Scholarships",
        "description": "A scholarship platform helping students find financial aid opportunities.",
        "type": "Childcare & Education",
        "link": "https://www.buddy4study.com/",
        "tags": ["Scholarship", "Students"],
        "icon": "📚"
    },
    {
        "title": "Teach For India - Free Education Initiatives",
        "description": "An NGO offering quality education to underprivileged children.",
        "type": "Childcare & Education",
        "link": "https://www.teachforindia.org/",
        "tags": ["NGO", "Education"],
        "icon": "🏫"
    },
    {
        "title": "Prerna NGO - Free Tuition for Kids",
        "description": "Providing free tuition classes to underprivileged children in India.",
        "type": "Childcare & Education",
        "link": "https://prerna.ngo/",
        "tags": ["Education", "Free"],
        "icon": "📖"
    }
]


resources.insert_many(data)
print("✅ Resources inserted successfully.")
