# deploy.ps1 - Script PowerShell para deploy no Azure DevOps e Heroku

# Mensagem de commit
$commitMessage = Read-Host "Digite a mensagem de commit"

# Verifica se há alterações a serem adicionadas ao commit
git add .

# Commit das alterações
git commit -m "$commitMessage"

# Push para o Azure DevOps
git push origin master

# Push para o GitHub
git push github master

# Push para o Heroku
git push heroku master

# Exibe uma mensagem de sucesso
Write-Host "Código enviado com sucesso para Azure DevOps e Heroku!"

heroku logs --tail