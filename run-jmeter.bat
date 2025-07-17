@echo off
echo Running JMeter test...

REM Delete existing results.jtl file if it exists
IF EXIST results\results.jtl (
    echo Deleting existing results\results.jtl file...
    del /q results\results.jtl
)

REM Delete existing report folder if it exists
IF EXIST results\html (
    echo Deleting existing results\html folder...
    rmdir /s /q results\html
)

REM Run JMeter test
"C:\apache-jmeter-5.6.3\bin\jmeter.bat" -n -t test-plan.jmx -l results\results.jtl -e -o results\html

echo Test finished. Report is in results\html
pause
