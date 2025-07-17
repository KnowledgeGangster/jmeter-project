/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "CategoriesPage"], "isController": false}, {"data": [1.0, 500, 1500, "TopPage"], "isController": false}, {"data": [1.0, 500, 1500, "GadgetsPage"], "isController": false}, {"data": [1.0, 500, 1500, "SpeakersPage"], "isController": false}, {"data": [1.0, 500, 1500, "NoticesPage"], "isController": false}, {"data": [1.0, 500, 1500, "TabletsPage"], "isController": false}, {"data": [1.0, 500, 1500, "HomePage"], "isController": false}, {"data": [1.0, 500, 1500, "WatchesPage"], "isController": false}, {"data": [1.0, 500, 1500, "AccountPage"], "isController": false}, {"data": [1.0, 500, 1500, "PopularPage"], "isController": false}, {"data": [1.0, 500, 1500, "ContactPage"], "isController": false}, {"data": [1.0, 500, 1500, "BlogPage"], "isController": false}, {"data": [1.0, 500, 1500, "TermsPage"], "isController": false}, {"data": [1.0, 500, 1500, "SmartphonesPage"], "isController": false}, {"data": [1.0, 500, 1500, "NewPage"], "isController": false}, {"data": [1.0, 500, 1500, "ComputersPage"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 80, 0, 0.0, 23.924999999999994, 12, 292, 17.0, 28.700000000000017, 58.85000000000001, 292.0, 9.699321047526674, 75.95970235208536, 1.3396950397065956], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["CategoriesPage", 5, 0, 0.0, 21.8, 18, 34, 18.0, 34.0, 34.0, 34.0, 0.6561679790026247, 10.08179031332021, 0.09035125492125984], "isController": false}, {"data": ["TopPage", 5, 0, 0.0, 17.0, 15, 19, 17.0, 19.0, 19.0, 19.0, 0.6558237145855194, 3.3722404167759708, 0.08582068140083945], "isController": false}, {"data": ["GadgetsPage", 5, 0, 0.0, 18.0, 16, 20, 18.0, 20.0, 20.0, 20.0, 0.6560818790185016, 6.074139302584962, 0.0954650390368718], "isController": false}, {"data": ["SpeakersPage", 5, 0, 0.0, 17.4, 15, 20, 18.0, 20.0, 20.0, 20.0, 0.6554798112218144, 4.752484678159413, 0.09601755047194546], "isController": false}, {"data": ["NoticesPage", 5, 0, 0.0, 15.4, 12, 18, 15.0, 18.0, 18.0, 18.0, 0.6554798112218144, 3.2277259766649187, 0.08833614643418983], "isController": false}, {"data": ["TabletsPage", 5, 0, 0.0, 17.0, 16, 18, 17.0, 18.0, 18.0, 18.0, 0.6554798112218144, 4.657107244690613, 0.09537743346879916], "isController": false}, {"data": ["HomePage", 5, 0, 0.0, 107.2, 55, 292, 59.0, 292.0, 292.0, 292.0, 0.6251562890722681, 8.213967554388597, 0.07936554451112778], "isController": false}, {"data": ["WatchesPage", 5, 0, 0.0, 18.2, 17, 20, 18.0, 20.0, 20.0, 20.0, 0.6556517178075006, 5.1500674091922365, 0.09540244722003671], "isController": false}, {"data": ["AccountPage", 5, 0, 0.0, 17.4, 14, 26, 15.0, 26.0, 26.0, 26.0, 0.6558237145855194, 6.0025802564270725, 0.08838249278593914], "isController": false}, {"data": ["PopularPage", 5, 0, 0.0, 16.2, 15, 18, 16.0, 18.0, 18.0, 18.0, 0.6560818790185016, 2.8840693068494945, 0.08841728447710273], "isController": false}, {"data": ["ContactPage", 5, 0, 0.0, 15.0, 12, 17, 15.0, 17.0, 17.0, 17.0, 0.6480881399870383, 3.581193292287751, 0.08734000324044071], "isController": false}, {"data": ["BlogPage", 5, 0, 0.0, 15.2, 13, 19, 15.0, 19.0, 19.0, 19.0, 0.6556517178075006, 3.264428435615001, 0.0864384588906373], "isController": false}, {"data": ["TermsPage", 5, 0, 0.0, 33.0, 13, 100, 16.0, 100.0, 100.0, 100.0, 0.6480041472265422, 4.232530213193364, 0.08606305080352514], "isController": false}, {"data": ["SmartphonesPage", 5, 0, 0.0, 17.4, 15, 19, 18.0, 19.0, 19.0, 19.0, 0.6558237145855194, 4.731281356571354, 0.09798928548006296], "isController": false}, {"data": ["NewPage", 5, 0, 0.0, 17.2, 15, 20, 17.0, 20.0, 20.0, 20.0, 0.6558237145855194, 6.402863285348898, 0.08582068140083945], "isController": false}, {"data": ["ComputersPage", 5, 0, 0.0, 19.4, 15, 29, 18.0, 29.0, 29.0, 29.0, 0.6561679790026247, 5.054159489829396, 0.09675914534120734], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 80, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
