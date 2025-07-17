@echo off
echo Running JMeter test...

REM Create results folder if it doesn’t exist
if not exist results (
    mkdir results
)

REM Run the JMeter test
jmeter -n -t test-plan.jmx -l results/results.jtl -e -o results/html

echo Test finished. Report is in results/html
pause
