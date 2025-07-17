@echo off
echo Running JMeter test...

REM Delete existing report folder if it exists
IF EXIST results\html (
    echo Deleting existing results\html folder...
    rmdir /s /q results\html
)

REM Run the JMeter test and generate the HTML report
"C:\apache-jmeter-5.6.3\bin\jmeter.bat" -n -t test-plan.jmx -l results\results.jtl -e -o results\html

echo Test finished. Report is in results\html
pause
