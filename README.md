# 🏈 NFL Survivor Pool – Google Sheets Edition

This project is a fully automated **NFL Survivor Pool app** built entirely inside **Google Sheets**, powered by **Apps Script (JavaScript)**. It was designed to replicate the core functionality of paid survivor pool platforms — without leaving the spreadsheet environment.

## ✨ Features

- ✅ Weekly team pick submissions via dropdown
- 🔒 Auto-locking of picks every Thursday at 8:00 PM ET
- 🔁 Weekly reset of picks on Tuesday morning
- 📊 Dashboard view with rules, player status, and weekly stats
- 🧠 Validation to prevent duplicate team picks
- 🧼 Hands-off operation — designed to run itself once set up
- 📡 Scrapes NFL scores to determine who is eliminated
- 🎨 App-like formatting and status indicators
- 🗓️ NFL game schedule automatically updates with current week

## 📷 Screenshots
<img width="1520" height="1082" alt="Screenshot 2025-09-09 152027" src="https://github.com/user-attachments/assets/50c75b99-081f-45bb-8bb1-381333278e62" />

- Dashboard View

<img width="1078" height="791" alt="Screenshot 2025-09-09 152042" src="https://github.com/user-attachments/assets/4a545f03-9674-4942-aa31-75ef1dd383ba" />

- Schedule of upcoming NFL Games automatically updates every Tuesday morning.

<img width="1433" height="868" alt="Screenshot 2025-09-09 152106" src="https://github.com/user-attachments/assets/5a66cd10-008f-4037-b144-28a9eec29622" />

- Players sheet showing previous picks and player status

<img width="999" height="882" alt="Screenshot 2025-09-09 152116" src="https://github.com/user-attachments/assets/e739e651-3d60-4ef3-8ef9-048db539dbb8" />

- Picks Sheet (with dropdowns and status indicators)

## 🛠 Technologies Used

- **Google Sheets**
- **Google Apps Script (JavaScript)**
- Custom time-based triggers
- API integration for score updates
- Conditional formatting and dynamic data validation

## 🚦 How It Works

1. **Players Sheet**  
   - Lists all participants and tracks their active/eliminated status.
  
2. **Picks Sheet**  
   - Players make one pick each week via dropdown (limited to teams they haven’t chosen yet).
   - Picks are locked Thursday 8PM using a time-based trigger.
   - Picks reset on Tuesday morning, and results are saved.

3. **Results Sheet**  
   - Stores a history of each week’s picks.

4. **Dashboard Sheet**  
   - Displays current week, player statuses, most-picked teams, rules, and admin notes.

5. **Admin Sheet**  
   - Holds team mapping (abbreviations ↔ full names), week counter, and config flags.

## 🧩 Folder Structure

This project uses multiple script files inside the Apps Script editor


## ⚙️ Setup Instructions

1. **Make a copy of the Google Sheet**
2. Open the **Extensions > Apps Script** editor
3. Paste in the code files
4. Configure your team mapping and player list
5. Set up time-based triggers:
   - Lock picks: Thursdays at 8:00 PM
   - Reset + unlock: Tuesdays at 8:00 AM
6. Test a full week cycle (optional but recommended)

## 🧠 Lessons Learned

- Google Apps Script is surprisingly powerful for app-like workflows
- Managing dynamic dropdowns and conditional formatting can mimic real UI
- Hands-off automation via triggers is a huge time-saver
- Planning logic to avoid hard-coded data pays off long-term

## 🤝 Contributions

This was originally built as a personal project, but I’m happy to share or adapt for others.  
Feel free to fork, suggest improvements, or reach out if you're building something similar.

## 📬 Contact

**Peyton Lawson**  
[LinkedIn](https://www.linkedin.com/in/peyton-e-lawson) • [Email](mailto:peyton.e.lawson@gmail.com) • [GitHub](https://github.com/peytonlawson)

---

> *Not affiliated with the NFL or any official fantasy platform. This is just for fun.*


