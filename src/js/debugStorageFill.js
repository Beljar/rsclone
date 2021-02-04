const lots = [
  {"uuid":"78c37473-13c1-4bb3-9f92-53d5c7e71165","name":null,"area":58.2,"factArea":58.2,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[181.5,519.125],[89,519.25],[89.625,559.5],[181.75,559.625]]},"tenantUUID":null,"price":0,"occupied":false,"electicity":0,"payPeriod":2},
  {"uuid":"706a2d34-f5ac-47d4-93c7-d94b557166dc","name":"G.9","area":55.6,"factArea":55,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[181.625,559.875],[89.125,559.5],[89.5,598.25],[181.625,598.25]]},"tenantUUID":null,"price":8200,"occupied":true,"electicity":150,"payPeriod":2},
  {"uuid":"01e5c4f7-a9f3-477a-b0be-f598288c908c","name":null,"area":39.1,"factArea":39.1,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[181.625,598.375],[120.5,598.375],[121,639.75],[181.25,639.375]]},"tenantUUID":null,"price":0,"occupied":false,"electicity":0,"payPeriod":2},
  {"uuid":"5dfef42e-aca7-428f-acaf-b489ed320830","name":null,"area":16.7,"factArea":16.7,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[272,511.625],[249.25,516.125],[258.25,560.875],[281.125,557]]},"tenantUUID":null,"price":0,"occupied":false,"electicity":0,"payPeriod":2},
  {"uuid":"ad3dd5e7-bf41-4701-803a-831ff186ff67","name":null,"area":12.9,"factArea":12.9,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[281.1875,556.9375],[258.25,561],[265,595.6875],[288.125,591.1875]]},"tenantUUID":null,"price":0,"occupied":false,"electicity":0,"payPeriod":2},
  {"uuid":"92525053-216f-4379-b327-2d8982de98e8","name":null,"area":43.4,"factArea":43.4,"water":false,"gas":false,"geometry":{"type":"polygon","coordinates":[[272.0625,511.6875],[288.0625,591.125],[307.25,587.25],[324.625,580.5],[301.8125,504.5625]]},"tenantUUID":null,"price":0,"occupied":false,"electicity":0,"payPeriod":2}]

const tenants = [{"uuid":"55f2260d-df83-412c-8785-12c6bff91186","name":"Bershka","itn":"123321","type":"4"},{"uuid":"a89c413f-e26e-48ea-b095-f153db9d0aa3","name":"McDonalds","itn":"3211233","type":"3"},{"uuid":"1bbc1cd4-68cb-4fc6-8197-a341ae7181c3","name":"SunLight","itn":"55656","type":"6"}]

const contracts = [{uuid:'f3cab3b8-328a-4b43-bc1c-3497f42b72f6', tenantUUID:tenants[0].uuid, lotUUID: lots[1].uuid}]

const debugStorageFill = () => {
  if (!localStorage.getItem('lots')){
    localStorage.setItem('lots', JSON.stringify(lots));
  }
  if (!localStorage.getItem('tenants')){
    localStorage.setItem('tenants', JSON.stringify(tenants))}
    if (!localStorage.getItem('contracts')){
      localStorage.setItem('contracts', JSON.stringify(contracts));      
    }
}

export default debugStorageFill;