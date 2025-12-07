# GitHub Repository Setup

## Schritt 1: Repository auf GitHub erstellen

1. Gehe zu [GitHub.com](https://github.com) und logge dich ein
2. Klicke auf das **"+"** Symbol oben rechts → **"New repository"**
3. Gib einen Repository-Namen ein (z.B. `portfolio` oder `modern-portfolio`)
4. Wähle **Public** oder **Private**
5. **WICHTIG**: Lasse "Initialize this repository with a README" **NICHT** angehakt
6. Klicke auf **"Create repository"**

## Schritt 2: Lokales Repository mit GitHub verbinden

Nachdem du das Repository erstellt hast, zeigt GitHub dir Befehle an. Führe diese aus:

```bash
# Ersetze USERNAME und REPO-NAME mit deinen Werten
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## Alternative: Mit SSH (empfohlen)

Wenn du SSH-Keys eingerichtet hast:

```bash
git remote add origin git@github.com:USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## Beispiel

Wenn dein GitHub-Username `jopa` ist und das Repo `portfolio` heißt:

```bash
git remote add origin https://github.com/jopa/portfolio.git
git branch -M main
git push -u origin main
```

## Weitere Commits pushen

Nach Änderungen:

```bash
git add .
git commit -m "Beschreibung der Änderungen"
git push
```

## Status prüfen

```bash
git status
```

