This is mini-crm to manage property leasing with UI combinig visiual information on map or plan and data management in forms.
For the demo purposes I used a mall plan.

Main entities:
Lot - a piece of property for rent. It has boundaries on plan, area,price and several other parameters.
Tenant - a client who rents lot. It has name, ITN and operates some type of buisness activity on the lot.
Contract - a connection between tenant and lot. When contract is signed the lot is becoming occupied and can't be leased again until contract is in power.

How to use:

1. Create lot:
  1. Click "New Lot" in the right upper corner of map
  2. Draw polyline. Hit enter to connect first and last point to create polygon from polyline.

2. Set/change lot info:
  1. Select lot on map - Lot form will appear.
  2. Fill corresponding fields in Lot form.
  3. Press Save button

3. Start contract:
  1. Select Lot on map.
  2. In Contract form select tenant via search box or create new tenant by clicking "New"
  3. Fill form
  4. Click "Start Contract"