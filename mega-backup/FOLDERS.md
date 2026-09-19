# OPERAVA MEGA folder map

Use these **exact** folder names in the MEGA account (as shown in the mobile app):

| MEGA folder | Purpose |
|-------------|--------|
| `OPERAVA APPLICANTS` | Recruitment AVA / careers applicant JSON backups |
| `OPERAVA CLIENTS` | Client records / engagement document backups |
| `OPERAVA EMPLOYEES` | Employee records backups |
| `OPERAVA FILES AND DOCUMENTS` | General OPERAVA files and shared documents |

## Recruitment AVA backup target

Automated applicant backups write into:

```text
OPERAVA APPLICANTS/
  OPERAVA-APP-YYYY-######_timestamp.json
```

Create the four folders in MEGA **before** enabling the backup Worker. The Worker does not create missing top-level folders by default (safer for production).
