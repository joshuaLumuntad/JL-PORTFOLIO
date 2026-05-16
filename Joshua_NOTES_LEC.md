ITELECTIVE – Security Models and Threat Frameworks

Lumuntad, Joshua T. | 4BSIT-2

1. CORE FUNDAMENTALS

Security means protecting valuable assets from dangers (threats) by fixing weaknesses (vulnerabilities).

Risk Formula:
    Risk = Threat x Vulnerability x Impact

Example: High threat + high vulnerability + high impact = very high risk.


2. CIA TRIAD (Three Main Security Goals)

- Confidentiality: Only authorized people can see the data.
- Integrity: Data is accurate and cannot be changed without permission.
- Availability: Systems and data are accessible when needed.

Incident Map: When an attack happens, check which part of the triad failed.
Example: Ransomware breaks Integrity (files encrypted) and Availability (can't access files).


3. ASSETS, THREATS, VULNERABILITIES

Assets (what you protect)
- Tangible: servers, laptops, network devices
- Intangible: company reputation, customer data

Vulnerabilities (weaknesses)
- Technical: unpatched software, misconfigured firewalls
- Human: untrained employees, falling for scams

Threats (dangers)
- Intentional: hackers, insiders with bad intent
- Accidental: natural disasters, someone deleting a file by mistake


4. INITIAL ACCESS (How attackers first get in)

- Phishing: Tricking a person with a fake email. This violates Confidentiality.
- Valid Accounts: Using stolen or guessed passwords.
  Note: 81% of data breaches involve weak or leaked credentials.
- Public-Facing Applications: Exploiting bugs in websites or servers.
  Example: ProxyLogon vulnerability in Microsoft Exchange.


5. EXECUTION AND PERSISTENCE (TA0003)

Execution (running the attack code)
- "Living off the Land": using built-in operating system tools like PowerShell, so no new software is installed.

Persistence (staying inside after a reboot)
- Registry Keys: Setting a program to run every time the computer starts.
- Scheduled Tasks: Telling the operating system to run malicious code at a specific time.
- Weaponized Macros: Malicious scripts hidden inside Office documents (Excel or Word).


6. DISCOVERY (TA0007) – Attacker maps the environment

Goals of Discovery:
- Topology Mapping: Find internal servers and active services.
- Defense Evasion: Detect if antivirus or sandboxes are present.
- Identity Harvesting: List all user accounts to find administrator credentials.

Common Discovery Techniques:
- T1046 Network Service Discovery: Scanning for open network ports.
- T1083 File and Directory Discovery: Searching for sensitive documents or backups.
- T1057 Process Discovery: Listing running applications to find targets.
- Cloud Discovery: Checking cloud environments like AWS or Azure.

How to Detect Discovery Activities:
- Anomaly-based detection: Machine learning flags unusual events.
- TTP-based detection: Tracks the behaviors an attacker must do (this is the gold standard because it focuses on methods, not just signs).


7. DEFENSE STRATEGIES

- Defense in Depth: Layering security across physical, network, application, and data layers. If one layer fails, others still protect.
- Principle of Least Privilege (PoLP): Give users and programs only the minimum access they need to do their job.
- Patch Management: Regularly updating software to fix known vulnerabilities. This is the number one defense against known exploits.


8. ESSENTIAL SECURITY TOOLS

Analysis Tools (for investigating malware and emails):
- REMnux: A Linux toolkit for malware analysis. Includes tools like emldump (extract parts of emails).

Reputation and Intelligence Checkers (to see if a file, IP, or URL is bad):
- VirusTotal
- Talos Intelligence (by Cisco)
- AbuseIPDB
- URLVOID