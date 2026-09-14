# Data Description

This document describes one of the items in the `result.itineraries` array from the API response.\
The response represents a **one-way flight search from Tehran to Istanbul**.\
The fields described below contain the information required to display the flight and its pricing details.

## `id`

A unique identifier for each itinerary.

## `totalPrice`

An object containing the price information for the service.

Use the `parsedValue` property to get the numeric price value.

## `commission`

An object containing the commission amount for the service.

Use the `parsedValue` property to get the numeric commission value.

## `totalTax`

An object containing the total tax amount for the service.

Use the `parsedValue` property to get the numeric tax value.

## `listPrice`

An object containing the final price of the service.

Use the `parsedValue` property to get the numeric price value.

## `currency`, `currencyTitle`

These properties represent the currency of the prices described above.

* `currency`: The currency code, such as `IRR`.
* `currencyTitle`: The display title of the currency, such as `ریال`.

---

## `flights`

A list containing the flight legs of the itinerary.

In this example, because the search is one-way, there is only one item in this list. However, **you must implement the page to handle multiple flight legs**.

### `flights[?].cabinType`

Represents the cabin type of the flight.

You should use an **enum or equivalent mapping** to convert the cabin type value into the appropriate display label.

### `flights[?].departureAirportLocationCode`, `flights[?].departureAirportLocationTitle`, `flights[?].departureAirportLocationPersianTitle`, `flights[?].departureCityTitle`, `flights[?].departureCityPersianTitle`

These fields represent the **origin** of the flight, including the departure airport and city.

### `flights[?].arrivalAirportLocationCode`, `flights[?].arrivalAirportLocationTitle`, `flights[?].arrivalAirportLocationPersianTitle`, `flights[?].arrivalCityTitle`, `flights[?].arrivalCityPersianTitle`

These fields represent the **destination** of the flight, including the arrival airport and city.

### `flights[?].departureDateTime`

Represents the flight's departure date and time.

### `flights[?].arrivalDateTime`

Represents the flight's arrival date and time.

### `flights[?].elapsedTime`

Represents the total flight duration in minutes.

### `flights[?].stops`

Represents the number of stops on this flight leg.

This value is related to `flights[?].flightsSegments` and `flights[?].flightsSegmentStops`.

---

### `flights[?].flightsSegments`

A list containing all segments of the flight leg.

A flight leg can contain multiple segments, so **you must implement the page to handle multiple segments**.

#### `flights[?].flightsSegments[?].departureAirportLocationCode`, `flights[?].flightsSegments[?].departureAirportLocationTitle`, `flights[?].flightsSegments[?].departureAirportLocationPersianTitle`, `flights[?].flightsSegments[?].departureCityTitle`, `flights[?].flightsSegments[?].departureCityPersianTitle`

These fields represent the **origin** of the segment, including the departure airport and city.

#### `flights[?].flightsSegments[?].arrivalAirportLocationCode`, `flights[?].flightsSegments[?].arrivalAirportLocationTitle`, `flights[?].flightsSegments[?].arrivalAirportLocationPersianTitle`, `flights[?].flightsSegments[?].arrivalCityTitle`, `flights[?].flightsSegments[?].arrivalCityPersianTitle`

These fields represent the **destination** of the segment, including the arrival airport and city.

#### `flights[?].flightsSegments[?].departureDateTime`

Represents the segment's departure date and time.

#### `flights[?].flightsSegments[?].arrivalDateTime`

Represents the segment's arrival date and time.

#### `flights[?].flightsSegments[?].duration`, `flights[?].flightsSegments[?].durationTime`

These fields represent the duration of the segment.

* `duration`: Duration in minutes.
* `durationTime`: Duration formatted as `HH:mm:ss`.

#### `flights[?].flightsSegments[?].flightNumber`

Represents the flight number of the segment.

#### `flights[?].flightsSegments[?].fareClass`, `flights[?].flightsSegments[?].cabinType`

These fields contain information about the fare class and cabin type of the segment.

#### `flights[?].flightsSegments[?].airplaneTitle`

Represents the type/model of the aircraft.

#### `flights[?].flightsSegments[?].airlineCode`, `flights[?].flightsSegments[?].airlineTitle`

These fields represent the airline operating the flight.

Use `airlineCode` to determine and render the appropriate airline logo/icon.

#### `flights[?].flightsSegments[?].baggages`

Represents the permitted baggage allowance for the segment.

If an itinerary contains multiple segments, the displayed baggage allowance for the flight should be calculated based on the **lowest baggage allowance among all segments**.

For example, if the segments have baggage allowances of `30 kg`, `25 kg`, and `30 kg`, the displayed baggage allowance should be `25 kg`.

---

## `priceDetails`

A list containing pricing information for each passenger type.

The list can contain pricing details for:

* Adult
* Child
* Infant

Use the `passengerType` field to determine the passenger type and display the corresponding price.

Each price-related value follows the same structure as the other price fields, with `source` containing the original value and `parsedValue` containing the numeric value to use in calculations and display.






<!-- # Data Description

This document describes one of the items in the `result.itineraries` array from the API response.

The response represents a **one-way flight search from Tehran to Istanbul**.

## id
this is unique if for each record 

## totalPrice
this object has data for represent price of service

## commission
this object has data for represent commission of service

## totalTax
this object has data for represent tex of service

## listPrice
this object has data for represent final price of service

## currency, currencyTitle
this properties represent currency of prevues prices

## flights
each items of this data represent leg of flight (in this result cause of one-way flight has one item but you must handle list)

### flights[?].cabinType
this field represent cabin type and ypu must use `Enum` for show correct label


### flights[?].departureAirportLocationCode, flights[?].departureAirportLocationTitle, flights[?].departureAirportLocationPersianTitle, flights[?].departureCityTitle, flights[?].departureCityPersianTitle
these fields represent Origin place (airport and city)

### flights[?].arrivalAirportLocationCode, flights[?].arrivalAirportLocationTitle, flights[?].arrivalAirportLocationPersianTitle, flights[?].arrivalCityTitle, flights[?].arrivalCityPersianTitle
these fields represent Destination place (airport and city)

### flights[?].departureDateTime
this field represent Airplane takeoff date & time

### flights[?].arrivalDateTime
this field represent Airplane landing date & time

### flights[?].elapsedTime
this filed represent fly time

### flights[?].stops
this field represent number of stop flight in this path (related to `flights[?].flightsSegments` and `flights[?].flightsSegmentStops` fields)

### flights[?].flightsSegments
this field is list of segment of this record (you must handle this list have many items)

#### flights[?].flightsSegments[?].departureAirportLocationCode, flights[?].flightsSegments[?].departureAirportLocationTitle, flights[?].flightsSegments[?].departureAirportLocationPersianTitle, flights[?].flightsSegments[?].departureCityTitle, flights[?].flightsSegments[?].departureCityPersianTitle
these fields represent Origin place (airport and city) for this segment


#### flights[?].flightsSegments[?].arrivalAirportLocationCode, flights[?].flightsSegments[?].arrivalAirportLocationTitle, flights[?].flightsSegments[?].arrivalAirportLocationPersianTitle, flights[?].flightsSegments[?].arrivalCityTitle, flights[?].flightsSegments[?].arrivalCityPersianTitle
these fields represent Destination place (airport and city) for this segment

#### flights[?].flightsSegments[?].departureDateTime
this field represent Airplane takeoff date & time for this segment

#### flights[?].flightsSegments[?].arrivalDateTime
this field represent Airplane landing date & time for this segment

#### flights[?].flightsSegments[?].duration, flights[?].flightsSegments[?].durationTime 
these fields represent fly time for this segment

#### flights[?].flightsSegments[?].flightNumber
this field represent flight number of this segment


#### flights[?].flightsSegments[?].fareClass, flights[?].flightsSegments[?].cabinType
These fields represent some details for site and airplane

#### flights[?].flightsSegments[?].airplaneTitle
this field represent type of airplane

#### flights[?].flightsSegments[?].airlineCode, flights[?].flightsSegments[?].airlineTitle
These fields represent air line (use `airlineCode` to render icon (image) of air line)


#### flights[?].flightsSegments[?].baggages
this field represent permissible load (if record has multi segment `Permissible load` of flight must be calculated and select lower `baggages`)

## priceDetails
This list represent pricing for each type of passengers (adult, child, infant) -->
