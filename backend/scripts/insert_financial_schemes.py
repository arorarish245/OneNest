from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["OneNest"]
f_schemes = db["financial_schemes"]

schemes = [
    # {
    #     "title": "PMGDISHA (Pradhan Mantri Gramin Digital Saksharta Abhiyan)",
    #     "description": "Provides digital literacy training to rural women and families, particularly targeting single mothers to empower them through technology.",
    #     "eligibility": "All women and rural families.",
    #     "benefits": "Empowerment through digital skills, access to online services, and improved employability.",
    #     "application_process": "Interested candidates can apply through PMGDISHA centers.",
    #     "tags": ["skill development", "digital literacy", "women empowerment"],
    #     "official_link": "https://pmgdisha.in/",
    #     "region": "Rural Areas"
    # },
    # {
    #     "title": "Beti Bachao Beti Padhao Scheme",
    #     "description": "Provides financial support to families, particularly single mothers, for the education and safety of girl children.",
    #     "eligibility": "Families with girl children.",
    #     "benefits": "Financial support, health, and education initiatives for girls.",
    #     "application_process": "Apply at government offices or online through the Ministry of Women and Child Development.",
    #     "tags": ["women empowerment", "education", "child welfare"],
    #     "official_link": "https://wcd.nic.in/",
    #     "region": "Nationwide"
    # },
    # {
    #     "title": "National Creche Scheme for Children",
    #     "description": "Supports the establishment of crèches and daycare centers for children of working parents, particularly helping single mothers.",
    #     "eligibility": "Children up to the age of 6 years, with priority to single mothers.",
    #     "benefits": "Affordable childcare, enabling single mothers to work or pursue education.",
    #     "application_process": "Apply through local district offices or child welfare centers.",
    #     "tags": ["childcare", "working parents", "single mothers"],
    #     "official_link": "https://wcd.nic.in/",
    #     "region": "Nationwide"
    # },
    # {
    #     "title": "Indira Gandhi Matritva Sahyog Yojana (IGMSY)",
    #     "description": "Provides maternity benefits to pregnant and lactating mothers, especially helpful to single mothers in need of financial support.",
    #     "eligibility": "Pregnant and lactating women (especially single mothers).",
    #     "benefits": "Financial assistance for pregnant women to ensure healthy pregnancies.",
    #     "application_process": "Apply through local Anganwadi centers or district health offices.",
    #     "tags": ["maternity benefits", "financial aid", "women health"],
    #     "official_link": "https://wcd.nic.in/",
    #     "region": "Nationwide"
    # },
    # {
    #     "title": "Bihar Single Woman Pension Scheme",
    #     "description": "Provides a monthly pension to single women, including widows and deserted wives.",
    #     "eligibility": "Women who are single (divorced, widowed, or abandoned).",
    #     "benefits": "Monthly financial assistance.",
    #     "application_process": "Apply through the Bihar state government’s welfare office or online portal.",
    #     "tags": ["pension", "single women", "financial support"],
    #     "official_link": "https://www.bihar.gov.in/",
    #     "region": "Bihar"
    # },
    # {
    #     "title": "Swadhar Greh Scheme",
    #     "description": "Offers shelter, food, and rehabilitation to single parents in distress, including widows, abandoned women, and single fathers.",
    #     "eligibility": "Women and men in distress, including single parents.",
    #     "benefits": "Shelter, food, rehabilitation, and counseling services.",
    #     "application_process": "Apply through the Ministry of Women and Child Development or local welfare offices.",
    #     "tags": ["shelter", "rehabilitation", "women welfare"],
    #     "official_link": "https://wcd.nic.in/",
    #     "region": "Nationwide"
    # },
    # {
    #     "title": "Kalyani Scheme (West Bengal)",
    #     "description": "A state scheme offering financial assistance to single parents (widowed, divorced, or deserted) in the form of a stipend.",
    #     "eligibility": "Widowed, divorced, or abandoned single parents.",
    #     "benefits": "Financial support to single parents to assist in their daily living expenses.",
    #     "application_process": "Apply through the West Bengal State Social Welfare Department.",
    #     "tags": ["financial support", "single parents", "state welfare"],
    #     "official_link": "https://wcdwb.gov.in/",
    #     "region": "West Bengal"
    # },
    # {
    #     "title": "Maternity Benefit Programme (Maternity Leave & Benefits)",
    #     "description": "Offers paid maternity leave for working parents, helping single mothers or fathers in balancing work and family responsibilities.",
    #     "eligibility": "Employed single mothers or fathers (in applicable sectors).",
    #     "benefits": "Paid maternity leave and job protection.",
    #     "application_process": "Apply through the employer and government portals.",
    #     "tags": ["maternity benefits", "paid leave", "working parents"],
    #     "official_link": "https://www.labour.gov.in/",
    #     "region": "Nationwide"
    # },
    # {
    #     "title": "Rajasthan Ujjwala Yojana",
    #     "description": "Provides free LPG connections to low-income families, including those headed by single parents, to improve household health.",
    #     "eligibility": "Low-income families, especially those headed by single parents.",
    #     "benefits": "Free LPG connections, improved cooking facilities.",
    #     "application_process": "Apply through local gas agencies or Rajasthan government portal.",
    #     "tags": ["women’s health", "energy", "household support"],
    #     "official_link": "https://www.pmujjwalayojana.com/",
    #     "region": "Rajasthan"
    # },
    # {
    #     "title": "Swadhar Greh Scheme (For Shelter)",
    #     "description": "Provides shelter, food, and rehabilitation services for women in difficult circumstances, including single mothers and women survivors of violence.",
    #     "eligibility": "Single women in need of shelter.",
    #     "benefits": "Emergency shelter, food, legal aid, and vocational training.",
    #     "application_process": "Apply through local welfare centers or district social welfare offices.",
    #     "tags": ["shelter", "women in crisis", "rehabilitation"],
    #     "official_link": "https://wcd.nic.in/",
    #     "region": "Nationwide"
    # }

    {
    "title": "Jagananna Vidya Deevena",
    "description": "Provides financial assistance for educational expenses to economically weaker families in Andhra Pradesh, aiming to support post-secondary education.",
    "eligibility": "Students from economically weaker sections pursuing post-secondary education.",
    "benefits": "Financial support for tuition fees and other educational expenses.",
    "application_process": "Apply through the official portal with documents like income certificate and academic records.",
    "tags": ["education", "financial aid", "student support"],
    "official_link": "https://www.ap.gov.in/",
    "region": "Andhra Pradesh"
    },
    {
    "title": "Jagananna Ammavodi",
    "description": "Provides financial support to mothers for sending their children to school in Andhra Pradesh, focusing on the education of children from disadvantaged backgrounds.",
    "eligibility": "Mothers of children attending government schools in Andhra Pradesh.",
    "benefits": "Financial assistance for school expenses, including uniforms, books, and other educational materials.",
    "application_process": "Eligible mothers can apply through the official portal with required documentation.",
    "tags": ["education", "financial aid", "mother support"],
    "official_link": "https://www.ap.gov.in/",
    "region": "Andhra Pradesh"  
    },
    {
    "title": "Chief Minister’s Universal Health Insurance Scheme",
    "description": "Provides health insurance coverage for families in Arunachal Pradesh, particularly targeting low-income and marginalized groups, including single parents.",
    "eligibility": "Residents of Arunachal Pradesh, primarily from economically disadvantaged backgrounds.",
    "benefits": "Covers medical expenses, hospitalization, and emergency health care.",
    "application_process": "Eligible residents can apply through the local government centers or the official website.",
    "tags": ["health insurance", "healthcare", "economic support"],
    "official_link": "https://www.arunachalpradesh.gov.in/",
    "region": "Arunachal Pradesh"
    },
    {
    "title": "State Education Scholarship Scheme",
    "description": "Provides scholarships to economically disadvantaged students in Arunachal Pradesh, especially aimed at helping single parents afford their children's education.",
    "eligibility": "Students from economically weaker sections, including those from single-parent households.",
    "benefits": "Scholarships for tuition fees and other educational expenses.",
    "application_process": "Apply through the official state education portal with necessary documents like income certificate.",
    "tags": ["education", "financial aid", "scholarships"],
    "official_link": "https://www.arunachalpradesh.gov.in/",
    "region": "Arunachal Pradesh"
    },
    {
    "title": "Assam State Orphanage Scheme",
    "description": "Supports orphaned children in Assam by providing shelter, education, and healthcare, with special provisions for single parents who are unable to care for their children.",
    "eligibility": "Orphan children in Assam and single parents who are unable to provide for their children.",
    "benefits": "Shelter, education, healthcare, and other welfare services.",
    "application_process": "Apply through the Assam government child welfare department.",
    "tags": ["orphan support", "child welfare", "single parent support"],
    "official_link": "https://assam.gov.in/",
    "region": "Assam"
    },
    {
    "title": "Assam State Girl Child Welfare Scheme",
    "description": "A scheme aimed at the welfare of girl children in Assam, providing financial assistance for their education and health, focusing on reducing gender inequality.",
    "eligibility": "Parents of girl children in Assam.",
    "benefits": "Financial aid for the education, healthcare, and welfare of girl children.",
    "application_process": "Parents can apply through the official government portal with required documents.",
    "tags": ["girl child", "welfare", "financial aid"],
    "official_link": "https://assam.gov.in/",
    "region": "Assam"
    },
    {
    "title": "Kanya Utthan Yojana",
    "description": "Aimed at promoting the education and welfare of girls in Bihar, providing financial incentives for the marriage and education of girls.",
    "eligibility": "Girls who are residents of Bihar and meet the eligibility criteria for age and educational status.",
    "benefits": "Financial assistance for the education, health, and marriage of girls.",
    "application_process": "Eligible families can apply through the official government portal.",
    "tags": ["girl welfare", "financial aid", "education"],
    "official_link": "https://www.bihar.gov.in/",
    "region": "Bihar"
    },
    {
    "title": "Balika Samriddhi Yojana",
    "description": "Provides financial support for the education and empowerment of girls from disadvantaged families in Bihar.",
    "eligibility": "Girls from below the poverty line (BPL) families in Bihar.",
    "benefits": "Financial assistance for education and welfare of girls.",
    "application_process": "Applications are available through the official Bihar government portal.",
    "tags": ["girl child", "education", "welfare", "financial aid"],
    "official_link": "https://www.bihar.gov.in/",
    "region": "Bihar"
    },
    {
    "title": "Chhattisgarh Kanya Suraksha Yojana",
    "description": "A state scheme focused on providing financial aid for the education, health, and protection of girl children in Chhattisgarh.",
    "eligibility": "Girls in Chhattisgarh, particularly from economically disadvantaged families.",
    "benefits": "Financial aid for education, health, and protection against gender-based violence.",
    "application_process": "Parents of eligible girls can apply via the state's official portal or local offices.",
    "tags": ["girl child", "health", "education", "financial support"],
    "official_link": "https://www.cg.gov.in/",
    "region": "Chhattisgarh"
    },
    {
    "title": "Bal Vikas Yojana",
    "description": "A comprehensive child welfare scheme in Chhattisgarh aimed at improving the living conditions of children and providing education and support for child development.",
    "eligibility": "Children from low-income families and orphaned children in Chhattisgarh.",
    "benefits": "Support for education, healthcare, and nutrition for children.",
    "application_process": "Eligible families can apply through the Chhattisgarh welfare department.",
    "tags": ["child welfare", "education", "healthcare", "nutrition"],
    "official_link": "https://www.cg.gov.in/",
    "region": "Chhattisgarh"
    },
    {
    "title": "Goa Girl Child Scheme",
    "description": "Provides financial support for the education and welfare of girl children in Goa, encouraging families to invest in their education and future.",
    "eligibility": "Girls from economically disadvantaged families in Goa.",
    "benefits": "Financial assistance for the education and welfare of girl children.",
    "application_process": "Parents can apply through the official Goa government website.",
    "tags": ["girl child", "education", "financial support"],
    "official_link": "https://goa.gov.in/",
    "region": "Goa"
    },
    {
    "title": "Goa Education Assistance Scheme",
    "description": "Provides financial assistance to students, including single parents, to support the cost of education in Goa.",
    "eligibility": "Students from low-income families or single-parent households in Goa.",
    "benefits": "Financial assistance for tuition fees, books, and other educational expenses.",
    "application_process": "Eligible students can apply via the Goa government’s education assistance portal.",
    "tags": ["education", "financial aid", "student support"],
    "official_link": "https://goa.gov.in/",
    "region": "Goa"
    },
    {
    "title": "Kanya Kelavani Yojana",
    "description": "Aimed at improving the educational status of girls in Gujarat, this scheme offers financial support for their education.",
    "eligibility": "Girls from economically weaker sections in Gujarat.",
    "benefits": "Financial aid for the education of girls, including scholarships and school fee waivers.",
    "application_process": "Applications can be submitted through the Gujarat government’s official portal.",
    "tags": ["girl education", "financial aid", "scholarships"],
    "official_link": "https://www.gujaratindia.gov.in/",
    "region": "Gujarat"
    },
    {
    "title": "Ladli Scheme",
    "description": "Aimed at promoting the education and welfare of girl children in Haryana, this scheme provides financial assistance for their education.",
    "eligibility": "Girls from economically weaker families in Haryana.",
    "benefits": "Financial aid for education, health, and welfare of girls.",
    "application_process": "Applications can be submitted through Haryana’s official welfare portal.",
    "tags": ["girl education", "financial support", "welfare"],
    "official_link": "https://www.haryana.gov.in/",
    "region": "Haryana"
    },
    {
    "title": "Kanya Kosh Scheme",
    "description": "This scheme provides financial assistance for the education and welfare of girl children in Haryana, focusing on empowering single-parent families.",
    "eligibility": "Girls from BPL (Below Poverty Line) families in Haryana.",
    "benefits": "Financial support for education, health, and welfare.",
    "application_process": "Applications can be made through the Haryana government’s portal.",
    "tags": ["girl welfare", "financial assistance", "education"],
    "official_link": "https://www.haryana.gov.in/",
    "region": "Haryana"
    },
    {
    "title": "Himachal Pradesh Girl Child Scheme",
    "description": "Aimed at improving the educational and social status of girl children in Himachal Pradesh, this scheme provides financial assistance for their upbringing and education.",
    "eligibility": "Girls from economically disadvantaged families in Himachal Pradesh.",
    "benefits": "Financial support for education, healthcare, and welfare of girls.",
    "application_process": "Eligible families can apply through the Himachal Pradesh welfare department.",
    "tags": ["girl child", "education", "healthcare", "welfare"],
    "official_link": "https://hpsw.gov.in/",
    "region": "Himachal Pradesh"
    },
    {
    "title": "Himachal Pradesh Education Assistance Scheme",
    "description": "This scheme provides financial assistance to students, including single-parent families, to support the cost of education in Himachal Pradesh.",
    "eligibility": "Students from low-income and single-parent families in Himachal Pradesh.",
    "benefits": "Financial assistance for school and college fees, books, and other educational resources.",
    "application_process": "Applications can be submitted through the Himachal Pradesh education department portal.",
    "tags": ["education", "financial aid", "student support"],
    "official_link": "https://hpsw.gov.in/",
    "region": "Himachal Pradesh"
    },
    {
    "title": "Jharkhand Girl Child Welfare Scheme",
    "description": "This scheme supports the welfare and education of girl children from low-income and single-parent families in Jharkhand.",
    "eligibility": "Girls from economically weaker or single-parent families in Jharkhand.",
    "benefits": "Financial assistance for school fees, uniforms, books, and health support.",
    "application_process": "Apply through the Department of Women and Child Development, Jharkhand.",
    "tags": ["girl child", "education", "welfare"],
    "official_link": "https://www.jharkhand.gov.in/",
    "region": "Jharkhand"
    },
    {
    "title": "Jharkhand Education Support Scheme",
    "description": "Provides educational assistance and scholarships for children from disadvantaged or single-parent households in Jharkhand.",
    "eligibility": "Students from low-income or single-parent families.",
    "benefits": "Scholarships, school/college fee reimbursement, and learning material support.",
    "application_process": "Applications are accepted via the Jharkhand Education Department portal.",
    "tags": ["education", "scholarships", "student support"],
    "official_link": "https://www.jharkhand.gov.in/",
    "region": "Jharkhand"
    },
    {
    "title": "Bhagyashree Scheme",
    "description": "Aimed at improving the status of the girl child in Karnataka, this scheme offers financial support to families upon the birth of a girl child and ensures continued aid for education.",
    "eligibility": "Girl children born to BPL families in Karnataka.",
    "benefits": "Fixed deposit in the girl’s name, health insurance, and education support.",
    "application_process": "Apply through local health departments or Karnataka government portals.",
    "tags": ["girl child", "birth support", "education aid"],
    "official_link": "https://kswb.karnataka.gov.in/",
    "region": "Karnataka"
    },
    {
    "title": "Karnataka Single Mother Welfare Scheme",
    "description": "Offers financial assistance and welfare services to single mothers to help with their children’s education and household needs.",
    "eligibility": "Single mothers residing in Karnataka from low-income backgrounds.",
    "benefits": "Monthly financial support and educational grants for children.",
    "application_process": "Submit applications via the Women and Child Welfare Department of Karnataka.",
    "tags": ["single mother", "education", "welfare support"],
    "official_link": "https://kswb.karnataka.gov.in/",
    "region": "Karnataka"   
    },
    {
    "title": "Balika Samriddhi Yojana (Kerala)",
    "description": "This centrally sponsored scheme is implemented in Kerala to provide financial support and education incentives to girl children, especially from poor families.",
    "eligibility": "Girl children from BPL families in Kerala.",
    "benefits": "Scholarships and financial support until class 10th.",
    "application_process": "Applications are accepted through anganwadi centers and local authorities.",
    "tags": ["girl child", "scholarship", "education support"],
    "official_link": "https://wcd.kerala.gov.in/",
    "region": "Kerala"
    },
    {
    "title": "Kerala Education Assistance Scheme",
    "description": "A scheme that provides education grants to children of single parents or economically challenged families in Kerala.",
    "eligibility": "Students from low-income or single-parent families in Kerala.",
    "benefits": "Scholarships, textbooks, and exam fee reimbursement.",
    "application_process": "Apply through Kerala’s Education Department or local school authorities.",
    "tags": ["education", "scholarship", "financial aid"],
    "official_link": "https://education.kerala.gov.in/",
    "region": "Kerala"
    },
    {
    "title": "Ladli Laxmi Yojana",
    "description": "Encourages the birth and education of girl children by providing financial support in a phased manner.",
    "eligibility": "Girl children born to families in Madhya Pradesh registered under the scheme.",
    "benefits": "Up to ₹1,18,000 in financial aid in installments from birth to marriage.",
    "application_process": "Apply through the Women and Child Development Department of Madhya Pradesh.",
    "tags": ["girl child", "financial support", "education"],
    "official_link": "http://ladlilaxmi.mp.gov.in/",
    "region": "Madhya Pradesh"
    },
    {
    "title": "Ladli Behna Yojana",
    "description": "Provides monthly financial aid to empower women, especially single mothers and economically weaker sections.",
    "eligibility": "Women aged 23–60 years residing in Madhya Pradesh with an annual family income under the specified limit.",
    "benefits": "₹1000 per month direct transfer to beneficiaries.",
    "application_process": "Apply through local government camps and online portals.",
    "tags": ["women empowerment", "monthly aid", "single mothers"],
    "official_link": "https://cmladlibahna.mp.gov.in/",
    "region": "Madhya Pradesh"
    },
    {
    "title": "Mukhyamantri Majhi Ladki Bahin Yojana",
    "description": "Offers monthly financial aid to empower women, especially from low-income and single-parent households in Maharashtra.",
    "eligibility": "Women aged 21–60 years with annual income below ₹2.5 lakhs.",
    "benefits": "₹1500 per month direct benefit.",
    "application_process": "Applications accepted through Maharashtra government official portal and offline centers.",
    "tags": ["women welfare", "monthly support", "single mothers"],
    "official_link": "https://aaplesarkar.mahaonline.gov.in/",
    "region": "Maharashtra"
    },
    {
    "title": "Mazi Kanya Bhagyashree Scheme",
    "description": "Provides financial support to promote girl child education and reduce gender discrimination in Maharashtra.",
    "eligibility": "Girl children from BPL families, limited to two daughters per family.",
    "benefits": "Fixed deposits up to ₹50,000 in the girl child’s name and education incentives.",
    "application_process": "Apply via Women and Child Development Department, Maharashtra.",
    "tags": ["girl child", "education", "financial aid"],
    "official_link": "https://womenchild.maharashtra.gov.in/",
    "region": "Maharashtra"
    },
    {
    "title": "Manipur Girl Child Welfare Scheme",
    "description": "Supports education and welfare of girl children in low-income and single-parent families in Manipur.",
    "eligibility": "Girl children from disadvantaged families residing in Manipur.",
    "benefits": "Educational support, uniform and book aid, and health services.",
    "application_process": "Apply through the Department of Social Welfare, Manipur.",
    "tags": ["girl child", "education", "welfare"],
    "official_link": "https://manipur.gov.in/",
    "region": "Manipur"
    },
    {
    "title": "Meghalaya Girl Child Scheme",
    "description": "Aims to support the birth, health, and education of girl children in economically weaker households in Meghalaya.",
    "eligibility": "Families with girl children below the poverty line in Meghalaya.",
    "benefits": "Financial assistance for health checkups, nutrition, and school supplies.",
    "application_process": "Apply through the Office of the Directorate of Social Welfare, Meghalaya.",
    "tags": ["girl child", "welfare", "education support"],
    "official_link": "https://megsocialwelfare.gov.in/",
    "region": "Meghalaya"
    },
    {
    "title": "Meghalaya Education Assistance Scheme",
    "description": "Offers scholarships and learning material support for children from single-parent and underprivileged families.",
    "eligibility": "Students from BPL or single-parent families in Meghalaya.",
    "benefits": "Scholarships, books, uniforms, and tuition fee support.",
    "application_process": "Apply through schools or the Education Department, Meghalaya.",
    "tags": ["education", "scholarship", "student aid"],
    "official_link": "https://megeducation.gov.in/",
    "region": "Meghalaya"
    },
    {
    "title": "Mizoram Girl Child Welfare Scheme",
    "description": "Provides financial and nutritional assistance to support the development of girl children in Mizoram.",
    "eligibility": "Girl children belonging to low-income or single-parent families in Mizoram.",
    "benefits": "Nutritional kits, school-related expenses, and welfare support.",
    "application_process": "Apply through Anganwadi centers or the State Social Welfare Department.",
    "tags": ["girl child", "nutrition", "education"],
    "official_link": "https://socialwelfare.mizoram.gov.in/",
    "region": "Mizoram"
    },
    {
    "title": "Mizoram Education Support Scheme",
    "description": "Helps economically weaker students in Mizoram with educational support, including scholarships and fee reimbursement.",
    "eligibility": "Students from single-parent or economically weaker families in Mizoram.",
    "benefits": "Scholarships, tuition support, and study materials.",
    "application_process": "Apply through schools or the Directorate of School Education, Mizoram.",
    "tags": ["education", "scholarship", "student support"],
    "official_link": "https://schooleducation.mizoram.gov.in/",
    "region": "Mizoram"
    },
    {
    "title": "Nagaland Girl Child Scheme",
    "description": "Promotes gender equality and supports the education and health of girl children in the state.",
    "eligibility": "Girl children from low-income families in Nagaland.",
    "benefits": "Financial incentives for education, health checkups, and basic necessities.",
    "application_process": "Apply through the State Department of Social Welfare, Nagaland.",
    "tags": ["girl child", "education", "healthcare"],
    "official_link": "https://socialwelfare.nagaland.gov.in/",
    "region": "Nagaland"
    },
    {
    "title": "Nagaland Education Assistance Scheme",
    "description": "Supports the continuation of education for children from single-parent and BPL families in Nagaland.",
    "eligibility": "Children from BPL or single-parent homes enrolled in school.",
    "benefits": "Scholarship funds, uniform and book expenses.",
    "application_process": "Apply through educational institutions or the Education Department of Nagaland.",
    "tags": ["education", "scholarship", "student welfare"],
    "official_link": "https://education.nagaland.gov.in/",
    "region": "Nagaland"
    },
    {
    "title": "Biju Sishu Suraksha Yojana",
    "description": "Provides financial assistance for the welfare and protection of orphaned and abandoned children, with special focus on girl children.",
    "eligibility": "Orphaned or abandoned children, particularly girls, in Odisha.",
    "benefits": "Financial support, education, and health assistance for the children.",
    "application_process": "Apply through the Child Welfare Department or Anganwadi centers.",
    "tags": ["child welfare", "girl child", "orphans"],
    "official_link": "https://wcdodisha.gov.in/",
    "region": "Odisha"
    },
    {
    "title": "Odisha Girls' Education Support Scheme",
    "description": "Aims to provide financial and material support to girls from economically disadvantaged families to continue their education.",
    "eligibility": "Girls from BPL and underprivileged families in Odisha.",
    "benefits": "Scholarships, educational materials, uniforms, and fee assistance.",
    "application_process": "Apply through schools or the Odisha Education Department.",
    "tags": ["girl education", "scholarship", "support"],
    "official_link": "https://odisha.gov.in/",
    "region": "Odisha"
    },
    {
    "title": "Punjab State Women Empowerment Scheme",
    "description": "Provides financial aid and empowerment programs for women, with special focus on single mothers and women heads of households.",
    "eligibility": "Women, including single mothers and women from economically weaker sections in Punjab.",
    "benefits": "Financial support, skills training, and social welfare programs.",
    "application_process": "Apply through the Punjab Women and Child Development Department.",
    "tags": ["women empowerment", "financial aid", "skills training"],
    "official_link": "https://www.punjabwcd.gov.in/",
    "region": "Punjab"
    },
    {
    "title": "Punjab Vidyarthi Kalyan Yojana",
    "description": "A scholarship scheme for students, especially from economically weaker families, to help with their educational expenses.",
    "eligibility": "Students from BPL families and those facing financial difficulties in Punjab.",
    "benefits": "Scholarships, books, and tuition fee support.",
    "application_process": "Apply through the Punjab Education Department or respective schools.",
    "tags": ["scholarship", "student support", "education"],
    "official_link": "https://education.punjab.gov.in/",
    "region": "Punjab"
    },
    {
    "title": "Annapurna Yojana",
    "description": "Provides subsidized food and nutrition to the elderly, single parents, and underprivileged families.",
    "eligibility": "Elderly, single parents, and families below the poverty line in Rajasthan.",
    "benefits": "Subsidized food items, including grains, pulses, and other essential food products.",
    "application_process": "Apply through the Department of Food and Civil Supplies, Rajasthan.",
    "tags": ["food support", "nutrition", "single parents"],
    "official_link": "https://food.rajasthan.gov.in/",
    "region": "Rajasthan"
    },
    {
    "title": "Chiranjeevi Yojana",
    "description": "A health insurance scheme for women and children in Rajasthan, with a special focus on single mothers and families living below the poverty line.",
    "eligibility": "Women, children, and single-parent families in Rajasthan.",
    "benefits": "Health insurance coverage for medical treatments, including surgeries and hospitalization.",
    "application_process": "Apply through the Health Department of Rajasthan or designated hospitals.",
    "tags": ["health insurance", "women's health", "children's health"],
    "official_link": "https://rajswasthya.nic.in/",
    "region": "Rajasthan"
    },
    {
        "title": "Sikkim Girl Child Scheme",
        "description": "A scheme aimed at providing financial and educational support for the welfare and empowerment of girl children in Sikkim.",
        "eligibility": "All girl children in Sikkim, particularly from low-income families.",
        "benefits": "Financial assistance for education, health, and other welfare services.",
        "application_process": "Apply through the State Women and Child Development Department of Sikkim.",
        "tags": ["girl child", "welfare", "education support"],
        "official_link": "https://sikkim.gov.in/",
        "region": "Sikkim"
    },
    {
        "title": "Sikkim Education Assistance Scheme",
        "description": "This scheme provides financial aid to children, especially girls, from economically weaker sections to pursue their education.",
        "eligibility": "Children from economically disadvantaged families in Sikkim.",
        "benefits": "Financial support for school fees, books, and other educational expenses.",
        "application_process": "Apply through the Sikkim Education Department or respective schools.",
        "tags": ["education support", "scholarship", "financial aid"],
        "official_link": "https://sikkimeducation.gov.in/",
        "region": "Sikkim"
    },
    {
        "title": "Kalaignar Magalir Urimai Thittam",
        "description": "A women empowerment scheme that provides financial support to women, with an emphasis on supporting single mothers and widows in Tamil Nadu.",
        "eligibility": "Women in Tamil Nadu, especially single mothers and widows.",
        "benefits": "Monthly financial assistance to women for economic independence.",
        "application_process": "Apply through the Tamil Nadu Social Welfare Department.",
        "tags": ["women empowerment", "single mothers", "financial assistance"],
        "official_link": "https://www.tn.gov.in/",
        "region": "Tamil Nadu"
    },
    {
        "title": "Chief Minister’s Girl Child Protection Scheme",
        "description": "A scheme focused on the protection and welfare of girl children in Tamil Nadu.",
        "eligibility": "Girl children in Tamil Nadu.",
        "benefits": "Financial assistance, health care, and educational benefits for girl children.",
        "application_process": "Apply through the Tamil Nadu Social Welfare Department.",
        "tags": ["girl child", "protection", "welfare"],
        "official_link": "https://www.tn.gov.in/",
        "region": "Tamil Nadu"
    },
    {
        "title": "Telangana Girl Child Scheme",
        "description": "A welfare scheme to empower and support girl children in Telangana.",
        "eligibility": "All girl children in Telangana, especially from marginalized backgrounds.",
        "benefits": "Financial assistance, education support, and healthcare benefits for girl children.",
        "application_process": "Apply through the Telangana Women and Child Development Department.",
        "tags": ["girl child", "welfare", "education support"],
        "official_link": "https://telangana.gov.in/",
        "region": "Telangana"
    },
    {
        "title": "Telangana Education Support Scheme",
        "description": "Provides financial assistance to students, particularly girls, to support their education in Telangana.",
        "eligibility": "Students from economically weaker sections, with a focus on girls.",
        "benefits": "Financial assistance for school fees, books, and uniforms.",
        "application_process": "Apply through the Telangana Education Department.",
        "tags": ["education support", "financial aid", "girls education"],
        "official_link": "https://telangana.gov.in/",
        "region": "Telangana"
    },
    {
        "title": "Tripura Girl Child Welfare Scheme",
        "description": "A scheme aimed at improving the welfare of girl children in Tripura by providing financial assistance and education support.",
        "eligibility": "Girl children from low-income families in Tripura.",
        "benefits": "Financial aid for education and health, along with other welfare services.",
        "application_process": "Apply through the Tripura Women and Child Development Department.",
        "tags": ["girl child", "welfare", "financial assistance"],
        "official_link": "https://tripura.gov.in/",
        "region": "Tripura"
    },
    {
        "title": "Tripura Education Assistance Scheme",
        "description": "Provides financial aid to students, especially girls, to pursue their education in Tripura.",
        "eligibility": "Students from economically disadvantaged backgrounds in Tripura.",
        "benefits": "Assistance for school fees, books, and uniforms.",
        "application_process": "Apply through the Tripura Education Department.",
        "tags": ["education support", "financial aid", "scholarship"],
        "official_link": "https://tripuraeducation.gov.in/",
        "region": "Tripura"
    },
     {
        "title": "Uttar Pradesh Maternity Benefit Program",
        "description": "Provides maternity benefits and financial support to single mothers and families in Uttar Pradesh.",
        "eligibility": "Single mothers or families in Uttar Pradesh.",
        "benefits": "Paid maternity leave, healthcare, and job protection.",
        "application_process": "Apply through the Uttar Pradesh government health and welfare portals.",
        "tags": ["maternity benefits", "single mothers", "financial assistance"],
        "official_link": "https://up.gov.in/",
        "region": "Uttar Pradesh"
    },
    {
        "title": "Bal Kalyan Yojana",
        "description": "A scheme to provide financial assistance to children from low-income families, ensuring their education and welfare.",
        "eligibility": "Children from economically disadvantaged families in Uttar Pradesh.",
        "benefits": "Financial support for education, health, and welfare services.",
        "application_process": "Apply through the Uttar Pradesh Department of Social Welfare.",
        "tags": ["children welfare", "financial aid", "education support"],
        "official_link": "https://up.gov.in/",
        "region": "Uttar Pradesh"
    },
    {
        "title": "Uttarakhand Girl Child Scheme",
        "description": "A scheme to support and promote the welfare of girl children in Uttarakhand.",
        "eligibility": "Girl children from low-income families in Uttarakhand.",
        "benefits": "Financial assistance, education support, and healthcare services for girl children.",
        "application_process": "Apply through the Uttarakhand Women and Child Development Department.",
        "tags": ["girl child", "welfare", "education support"],
        "official_link": "https://uttarakhand.gov.in/",
        "region": "Uttarakhand"
    },
    {
        "title": "Uttarakhand Education Assistance Scheme",
        "description": "Provides financial aid to children, especially girls, to support their education in Uttarakhand.",
        "eligibility": "Children from economically disadvantaged backgrounds in Uttarakhand.",
        "benefits": "Financial assistance for school fees, books, and other educational expenses.",
        "application_process": "Apply through the Uttarakhand Education Department.",
        "tags": ["education support", "financial aid", "scholarship"],
        "official_link": "https://uttarakhandeducation.gov.in/",
        "region": "Uttarakhand"
    },
    {
        "title": "Kanyashree Prakalpa",
        "description": "A scheme designed to promote the welfare of girl children in West Bengal by providing financial assistance for education and health.",
        "eligibility": "Girl children in West Bengal, particularly from low-income families.",
        "benefits": "Financial support for education, healthcare, and other welfare services.",
        "application_process": "Apply through the West Bengal Department of Women and Child Development.",
        "tags": ["girl child", "welfare", "financial assistance"],
        "official_link": "https://wcdwb.gov.in/",
        "region": "West Bengal"
    },
    {
        "title": "West Bengal Single Mother Assistance Scheme",
        "description": "Provides support and financial aid to single mothers in West Bengal to ensure their empowerment and welfare.",
        "eligibility": "Single mothers in West Bengal.",
        "benefits": "Financial assistance for welfare, healthcare, and education.",
        "application_process": "Apply through the West Bengal Department of Women and Child Development.",
        "tags": ["single mothers", "welfare", "financial assistance"],
        "official_link": "https://wcdwb.gov.in/",
        "region": "West Bengal"
    },
    {
        "title": "Delhi Women and Child Welfare Fund",
        "description": "A fund established to support women and children in Delhi, focusing on financial assistance and welfare services.",
        "eligibility": "Women and children in Delhi, particularly from low-income families.",
        "benefits": "Financial support for education, healthcare, and social welfare.",
        "application_process": "Apply through the Delhi Social Welfare Department.",
        "tags": ["women welfare", "child welfare", "financial assistance"],
        "official_link": "https://delhi.gov.in/",
        "region": "Delhi"
    },
    {
        "title": "Child Education Assistance Scheme",
        "description": "A scheme aimed at providing educational support to children from underprivileged families in Delhi.",
        "eligibility": "Children from economically disadvantaged families in Delhi.",
        "benefits": "Financial assistance for school fees, books, and uniforms.",
        "application_process": "Apply through the Delhi Education Department.",
        "tags": ["education support", "financial aid", "children"],
        "official_link": "https://delhi.gov.in/",
        "region": "Delhi"
    },
     {
        "title": "Jammu & Kashmir Girl Child Scheme",
        "description": "A welfare scheme that aims to support girl children in Jammu & Kashmir by providing financial and educational assistance.",
        "eligibility": "Girl children in Jammu & Kashmir.",
        "benefits": "Financial assistance for education, health, and welfare.",
        "application_process": "Apply through the Jammu & Kashmir Women and Child Development Department.",
        "tags": ["girl child", "welfare", "education support"],
        "official_link": "https://jk.gov.in/",
        "region": "Jammu & Kashmir"
    },
    {
        "title": "Jammu & Kashmir Education Support Scheme",
        "description": "A scheme that provides financial support for the education of children in Jammu & Kashmir.",
        "eligibility": "Children from economically disadvantaged families in Jammu & Kashmir.",
        "benefits": "Financial aid for school fees, books, and other educational expenses.",
        "application_process": "Apply through the Jammu & Kashmir Education Department.",
        "tags": ["education support", "financial aid", "scholarship"],
        "official_link": "https://jkeducation.gov.in/",
        "region": "Jammu & Kashmir"
    },
    {
        "title": "Ladakh Girl Child Welfare Scheme",
        "description": "A scheme that provides support for the welfare of girl children in Ladakh, focusing on their education and health.",
        "eligibility": "Girl children in Ladakh, particularly from low-income families.",
        "benefits": "Financial assistance for education, health, and other welfare services.",
        "application_process": "Apply through the Ladakh Women and Child Development Department.",
        "tags": ["girl child", "welfare", "education support"],
        "official_link": "https://ladakh.gov.in/",
        "region": "Ladakh"
    },
    {
        "title": "Ladakh Education Assistance Scheme",
        "description": "Provides financial assistance for the education of children in Ladakh, especially those from economically disadvantaged families.",
        "eligibility": "Children from economically weaker sections in Ladakh.",
        "benefits": "Financial aid for school fees, books, and uniforms.",
        "application_process": "Apply through the Ladakh Education Department.",
        "tags": ["education support", "financial aid", "scholarship"],
        "official_link": "https://ladakheducation.gov.in/",
        "region": "Ladakh"
    }
]


f_schemes.insert_many(schemes)
print("✅ Schemes inserted successfully.")
