#HTML Templates
_For instructions on how to run the tests, check the following link: 
https://github.com/TelerikAcademy/JavaScript-UI-and-DOM/blob/master/README.md#user-content-preparing-the-local-machine-for-unit-testing-with-mocha-and-chai_

##Task 1 - Just a table

* Define a function that sets the template inside a provided element.
  * The template should generate the table with class `.items-table` following the rules:
    * A **data object** is provided and it contains two properties:
      * `headers` - an array of strings that should be used in the template to generate the headers of the table
      * `items` - an array of objects, where every object has keys `col1`, `col2` and `col3`
      
      
  * _Example:_
    * Having:
    
    
          data = {        
            headers = ['Vendor', 'Model', 'OS'],          
            items = [{          
              col1: 'Nokia',            
              col2: 'Lumia 920',            
              col3: 'Windows Phone'                      
            }, {          
              col1: 'LG',            
              col2: 'Nexus 5',            
              col3: 'Android'                      
            }, {          
              col1: 'Apple',            
              col2: 'iPhone 6',                        
              col3: 'iOS'                      
            }]          
          }; 
        
        
    * the template should generate:      
      
       
                  
            <table class="items-table"> 
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vendor</th>
                  <th>Model</th>
                  <th>OS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>Nokia</td> 
                  <td>Limia 920</td>
                  <td>Windows Phone</td>
                </tr>
                <tr>
                  <td>1</td> 
                  <td>LG</td>
                  <td>Nexus 5</td> 
                  <td>Android</td> 
                </tr>
                <tr>
                  <td>2</td> 
                  <td>Apple</td>
                  <td>iPhone 6</td> 
                  <td>iOS</td> 
                </tr>
              </tbody>
            </table>
          
          
##Task 2

##Task 3
