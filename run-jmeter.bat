@echo off
set JMETER_HOME=C:\apache-jmeter-5.6.3
set PATH=%JMETER_HOME%\bin;%PATH%

echo Running JMeter test...
"%JMETER_HOME%\bin\jmeter.bat" -n -t Learnix.jmx -l results\result.jtl -e -o results\html

echo Test finished. Report is in results\html
exit /b 0
