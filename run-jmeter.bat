echo Running JMeter test...
"C:\apache-jmeter-5.6.3\bin\jmeter.bat" -n -t Learnix.jmx -l results/result.jtl -e -o results/html
echo Test finished. Report is in results/html
pause
