<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# [The Chai Verdict] 🎯


## Basic Details
### Team Name: [Dcode]


### Team Members
- Team Lead: [Devika Biju] - [LBS Institute of Technology for Women]

### Project Description
CHAI Verdict is a web app that puts your cup of chai on trial. Upload a photo, answer five brutally honest questions about how it tasted, and the Supreme Court of Chai will hand down a verdict— complete with a score, an explanation, and a roast

Two chais can also be pitted against each other in Chai Battle mode, because some arguments can only be settled in court]

### The Problem (that doesn't exist)
[Every Indian household has the same unsolved mystery: is this chai actually kadak, or did someone just wave a tea bag near a glass of hot milk and call it a day? Opinions get thrown around at every family gathering, nobody agrees, and there is no official record of who was right.]

### The Solution (that nobody asked for)
[A full-blown "court system" for chai — with a proper interrogation (taste questionnaire), forensic evidence (photo analysis), a scoring engine, an official verdict, and a roast so your chai knows exactly where it stands. Legally binding? No. Emotionally devastating? Also no, it's just a joke — but very satisfying? Yes]

## Technical Details
### Technologies/Components Used
For Software:
- [HTML5, CSS3, JavaScript, Python]
- [FastAPI (backend REST API)]
- [OpenCV (image processing for the visual chai score), Uvicorn (ASGI server to run FastAPI)]
- [VS Code, Live Server (local frontend hosting), Render (deployment), Git/GitHub]

For Hardware:
- [modern smartphone, laptop; device camera or photo gallery for evidence submission]
- [No special hardware needed — a device that can run a modern web browser and take/upload a photo is enough]
- [Stable internet connection to reach the deployed frontend and backend]

### Implementation
For Software:
# Installation
[git clone <your-repo-url>
cd chai-verdict/backend
pip install -r requirements.txt]

# Run
[# Start the backend (from inside the backend folder)
uvicorn main:app --reload
# Runs at http://127.0.0.1:8000

# Start the frontend
# Open index2.html with VS Code's Live Server extension
# Runs at http://127.0.0.1:5500/index2.html]

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![<img width="1366" height="768" alt="Screenshot (1596)" src="https://github.com/user-attachments/assets/a13810bf-bbe7-4673-9211-fba045367261" />
]
(Here one can upload picture)

![<img width="1366" height="768" alt="Screenshot (1597)" src="https://github.com/user-attachments/assets/36b37a95-9f58-451a-8d1c-9be05aa5715e" />
](combined visual + taste scoring with a plain-language explanation)

![<img width="1366" height="768" alt="Screenshot (1598)" src="https://github.com/user-attachments/assets/3986d3fb-a392-4886-8e7f-2bf1fc9835f3" />
](upload two chais and let the court decide a winner
📱 Fully responsive, mobile-friendly interface)


# Diagrams
![                ┌──────────────────┐
                │      USER         │
                │ Questions + Photo │
                └────────┬──────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    FRONTEND       │
                │  HTML / CSS / JS  │
                └────────┬──────────┘
                         │
                     REST API
                         │
                         ▼
                ┌──────────────────┐
                │     FASTAPI       │
                │     BACKEND       │
                └────────┬──────────┘
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
   ┌─────────────────┐       ┌─────────────────┐
   │  IMAGE ANALYSIS  │       │  ANSWER SCORING  │
   │  Chai Photograph │       │  5 User Inputs   │
   └────────┬─────────┘       └────────┬─────────┘
            │                          │
            └────────────┬─────────────┘
                         ▼
                ┌──────────────────┐
                │  SCORING ENGINE   │
                │  Final Evaluation │
                └────────┬──────────┘
                         ▼
                ┌──────────────────┐
                │   CHAI VERDICT    │
                │ Score + Verdict   │
                └──────────────────┘]

# Build Photos
![](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

### Project Demo
# Video
[Add your demo video link here]
*Explain what the video demonstrates*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- [Devika Biju]: [Solo Developer]
---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



