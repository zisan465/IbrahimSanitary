
//popup function
function pasteTextForChallan() {
  var textarea = document.getElementById('myTextarea');
  navigator.clipboard.readText().then(text => {
    textarea.value = text;

    var popup = document.getElementById('popup');
    popup.style.opacity = 0;
    popup.style.visibility = 'hidden';
    document.getElementById("row-2").style.display="none";
    document.getElementById("unit-price").style.display="none";
    document.getElementById("total-price").style.display="none";
    document.getElementById("worning").innerText="পণ্য বুঝে মিলিয়ে নিবেন।";
    parseAndDisplay('challan')
  });
}
function pasteTextForInvoice(){
  var textarea = document.getElementById('myTextarea');
  navigator.clipboard.readText().then(text => {
    textarea.value = text;

    var popup = document.getElementById('popup');
    popup.style.opacity = 0;
    popup.style.visibility = 'hidden';
   document.getElementById("signature-section").style.marginTop="240px"
   document.getElementById("worning").innerText="পণ্য ফেরতের সময় অবশ্যই চালান সাথে আনবেন।";
    parseAndDisplay('invoice')
  });
}


function openPopup() {
  var popup = document.getElementById('popup');
  popup.style.opacity = 1;
  popup.style.visibility = 'visible';
  setRandomString()
}
window.onload = openPopup;
//popup Function Work Done



function parseAndDisplay(getValue) {
  //Data Shorting Here
  var inputValue = document.getElementById('myTextarea').value;
  var lines = inputValue.split('\n');
  lines = lines.filter(line => line.trim() !== '');
  var customerInfo = lines.slice(0, 7);
  var products = lines.slice(7, -11).map(line => {
    var values = line.split('\t');
    return {
      code: values[1],
      description: values[2],
      quantity: values[3],
      unitPrice: parseFloat(values[4]),
      total: parseFloat(values[5])
    };
  });
  var moneyDetails = lines.slice(-11).map(line => {
    var [key, value] = line.split(':');
    return { [key.trim()]: parseFloat(value.trim()) };
  });
  var result = {
    customerInfo: customerInfo,
    products: products,
    moneyDetails: moneyDetails
  };
//Data Shorting Complete


// Customer Information Data Set Here
  for (let i = 0; i < result.customerInfo.length; i++) {
    if(i==4){
      //data formation
      var deliveryAddressString = result.customerInfo[i];
      var deliveryAddress = deliveryAddressString.split('Delivery Address:')[1].split('Sales by:')[0].trim();  
      document.getElementById('customer-delivery-address').innerText=deliveryAddress;  
 
    } else{
      //data formating

      var namePart = result.customerInfo[i].split(":"); 
      var key = namePart[0].trim();
      var customerName = namePart.slice(1).join(':').trim();
      //condition based data seting 
      if(i==0){
        document.getElementById('customer-id').innerText=convertToBanglaNumber(customerName); 
      }else if(i==1){
        document.getElementById('customer-name').innerText=customerName;
      }else if(i==2){
        document.getElementById('customer-number').innerText=convertToBanglaNumber(customerName);
      }else if(i==3){
        document.getElementById('customer--address').innerText=customerName;
      }else if(i==5){
        document.getElementById('customer-challan-no').innerText=convertToBanglaNumber(customerName);
      }else if(i==6){
        document.getElementById('sales-time').innerText=convertToBanglaNumber(customerName);
      };
    } 
  }
  

  if(getValue=="invoice"){


    var productsTableBody = document.getElementById('dinamic-product-add');

    for (var i = 1; i < result.products.length; i++) {
      var row = document.createElement('tr');
    
      var cellNumber = document.createElement('td');
      cellNumber.textContent = convertToBanglaNumber(i) ;
      row.appendChild(cellNumber); 
    
      var cellCode = document.createElement('td');
      cellCode.textContent = convertToBanglaNumber(result.products[i].code);
      row.appendChild(cellCode);
    
     
    
      var cellDescription = document.createElement('td'); 
      cellDescription.textContent = productlist[result.products[i].code];
      row.appendChild(cellDescription);  
      
    
      var cellQuantity = document.createElement('td');
      cellQuantity.colSpan = 3; // colspan='3'
      var unitchanging = convertUnits(result.products[i].quantity)
      cellQuantity.textContent = convertToBanglaNumber(unitchanging); 
      row.appendChild(cellQuantity); 
    
      var cellUnitPrice = document.createElement('td');
      cellUnitPrice.textContent = convertToBanglaNumber(result.products[i].unitPrice);
      row.appendChild(cellUnitPrice);
    
      var cellTotal = document.createElement('td');
      cellTotal.textContent = convertToBanglaNumber(result.products[i].total);
      row.appendChild(cellTotal);
      productsTableBody.appendChild(row);
    }

    //Due SUMMARRY CALCULATION
    for (var i = 0; i < result.moneyDetails.length; i++) {
      var valueObject = result.moneyDetails[i];
      for (var key in valueObject) {
        if(i==0){
          document.getElementById('previous-due').innerText = convertToBanglaNumber(valueObject[key]); 
        }else if(i==1){
          document.getElementById('present-due').innerText = convertToBanglaNumber(valueObject[key]);
        }else if(i==2){
          document.getElementById('total-due').innerText = convertToBanglaNumber(valueObject[key]);
        }else if(i==3){
          document.getElementById('subtotal').innerText = convertToBanglaNumber(valueObject[key]);
        }else if(i==5){
          document.getElementById('discount').innerText = convertToBanglaNumber(valueObject[key]);
        }else if(i==6){
          document.getElementById('labour-cost').innerText = convertToBanglaNumber(valueObject[key]);
        } else if(i==7){
          document.getElementById('transport-cost').innerText = convertToBanglaNumber(valueObject[key]);
        } else if(i==8){
          document.getElementById('total-amount').innerText = convertToBanglaNumber(valueObject[key]);
        } else if(i==9){
          document.getElementById('submision-ammount').innerText = convertToBanglaNumber(valueObject[key]);
        } else if(i==10){
          document.getElementById('due-amount').innerText = convertToBanglaNumber(valueObject[key]);
        }else{
          document.getElementById('vat').innerText = convertToBanglaNumber(valueObject[key]);
        }
      }
    }

  }else{


    var productsTableBody = document.getElementById('dinamic-product-add');

    for (var i = 1; i < result.products.length; i++) {
      var row = document.createElement('tr');

      var cellNumber = document.createElement('td');
      cellNumber.textContent = convertToBanglaNumber(i) ;
      row.appendChild(cellNumber); 

      var cellCode = document.createElement('td');
      cellCode.textContent = convertToBanglaNumber(result.products[i].code);
      row.appendChild(cellCode);

    

      var cellDescription = document.createElement('td'); 
      cellDescription.textContent = productlist[result.products[i].code];
      row.appendChild(cellDescription);  
      

      var cellQuantity = document.createElement('td');
      cellQuantity.colSpan = 3; // colspan='3'
      var unitchanging = convertUnits(result.products[i].quantity)
      cellQuantity.textContent = convertToBanglaNumber(unitchanging); 
      row.appendChild(cellQuantity); 

      productsTableBody.appendChild(row);
    }
  }
// PRODUCT SETING HERE
window.print()
} 













//unit convert
function convertUnits(inputString) {
  const regex = /(\d+)\s*([a-zA-Z]+)/g;
  const resultString = inputString.replace(regex, (_, number, unit) => {
    const translatedUnit = unitTranslations[unit.toLowerCase()] || unit;
    return `${number} ${translatedUnit}`;
  });
  return resultString;
} 

//English Number to Bangla Number Convert
function convertToBanglaNumber(englishNumber) {
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  const englishNumberString = englishNumber.toString();
  let banglaNumberString = '';

  for (let i = 0; i < englishNumberString.length; i++) {
    const digit = englishNumbers.indexOf(englishNumberString[i]);
    banglaNumberString += digit !== -1 ? banglaNumbers[digit] : englishNumberString[i];
  }

  return banglaNumberString;
}





  // Function to select a random string from the array
  function getRandomString() {
    const randomIndex = Math.floor(Math.random() * stringArray.length);
    return stringArray[randomIndex];
  }

  // Function to set the DOM element with the randomly selected string
  function setRandomString() {
    const randomString = getRandomString();
    const containerElement = document.getElementById('randomStringContainer');
    containerElement.textContent = randomString;
  }

  // Call the function when the page loads to set a random string
