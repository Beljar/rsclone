This is mini-crm to manage property leasing with UI combinig visiual information on map or plan and data management in forms.
For the demo purposes I used a mall plan.

Main entities:
Lot - a piece of property for rent. It has boundaries on plan, area,price and several other parameters.
Tenant - a client who rents lot. It has name, ITN and operates some type of buisness activity on the lot.
Contract - a connection between tenant and lot. When contract is signed the lot is becoming occupied and can't be leased again until contract is in power.

How to use:

1. Create lot:
  * Click "New Lot" in the right upper corner of map
  * Draw polyline. Hit enter to connect first and last point to create polygon from polyline.

2. Set/change lot info:
 * Select lot on map - Lot form will appear.
 * Fill corresponding fields in Lot form.
 * Press Save button

3. Start contract:
 * Select Lot on map.
 * In Contract form select tenant via search box or create new tenant by clicking "New"
 * Fill form
 * Click "Start Contract"