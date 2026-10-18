@echo off
chcp 65001 >nul
title La Dolce Vita - Confeitaria Artesanal (Servidor Oficial)
color 0D
echo ========================================================
echo      LA DOLCE VITA - CONFEITARIA ARTESANAL
echo ========================================================
echo.
echo Iniciando o site na porta 5050...
echo Acesse no navegador: http://localhost:5050
echo.
start http://localhost:5050
node "%~dp0server.js"
pause
