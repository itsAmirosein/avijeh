# UI/UX Requirements

This document describes the UI/UX requirements for the flight search result page.

The page should display the available flight results and provide users with sorting and filtering capabilities.

---

## 1. Flight Results

The main content of the page should display the available flight results as flight cards.

Each flight card should provide the user with the important information required to understand and compare the flight options.

The flight card should include, at minimum:

- Departure information
- Arrival information
- Flight duration
- Number of stops
- Airline
- Aircraft type
- Cabin type
- Baggage allowance
- Flight price
- An action for selecting the flight

The exact visual design and layout should follow the provided design reference.

---

## 2. Sorting

The result list must provide sorting options.

The following sorting options should be available:

### Default

Display the results in the same order as they are returned by the API.

No sorting should be applied.

This must be the default sorting option.

### Cheapest

Sort the results from the lowest price to the highest price.

### Most Expensive

Sort the results from the highest price to the lowest price.

### Fastest

Sort the results from the shortest flight duration to the longest flight duration.

### Nearest Departure

Sort the results based on the departure time, starting with the earliest departure.

### Important

The sorting options must work correctly together with the active filters.

Changing the sorting option must not remove or reset the selected filters.

---

# 3. Filters

The result page must provide filters that allow users to narrow down the available flight results.

The following filters must be provided:

## 3.1 Departure Time

Filter flights based on their departure time.

The user should be able to select a time range for the departure.

For example:

- Early morning
- Morning
- Afternoon
- Evening

The exact time ranges should follow the provided design/reference.

---

## 3.2 Arrival Time

Filter flights based on their arrival time.

The user should be able to select a time range for the arrival.

---

## 3.3 Airline

Filter flights by airline.

The user can select one or multiple airlines.

Each airline should be displayed with its appropriate name and, where applicable, logo/icon.

---

## 3.4 Airplane Type

Filter flights by aircraft type.

Examples:

- Airbus A320
- Airbus A330
- Boeing 737
- Boeing 777

The available options should be generated from the provided flight data.

---

## 3.5 Cabin Type

Filter flights by cabin type.

The available cabin types should be displayed using appropriate user-friendly labels.

The filter should support selecting multiple cabin types.

---

## 3.6 Departure Airport

Filter flights based on the departure airport.

The available airports should be determined from the provided flight data.

---

## 3.7 Arrival Airport

Filter flights based on the arrival airport.

The available airports should be determined from the provided flight data.

---

## 3.8 Flight Number

Provide a search field that allows the user to search for a specific flight number.

The search should be performed against the flight number provided in the flight data.

For example:

`CA5291`

The search should support partial matching where appropriate.

---

# 4. Filter Combination Rules

The combination of filters is an important part of this task.

Different filter fields must work together using **AND** logic.

Multiple selections inside the same filter field must work using **OR** logic.

### AND between different filter fields

When the user selects options from different filter fields, a flight must satisfy **all selected filter fields** to remain in the result.

For example:

```text
Airline = Soroush Air
AND
Cabin Type = Economy
AND
Airplane Type = Airbus A330
```

Only flights that satisfy all three conditions should be displayed.

### OR within the same filter field

When the user selects multiple values inside the same filter field, a flight can match **any** of the selected values.

For example:

```text
Airline = Soroush Air
OR
Airline = Caspian
```

The result should contain flights operated by either Soroush Air or Caspian.

### Combined example

If the user selects:

```text
Airline:
  - Soroush Air
  - Caspian

Cabin Type:
  - Economy

Airplane Type:
  - Airbus A330
  - Boeing 737
```

The effective filter should be:

```text
(Soroush Air OR Caspian)
AND
(Economy)
AND
(Airbus A330 OR Boeing 737)
```

This means a flight must:

1. Be operated by either Soroush Air or Caspian,
2. Have Economy cabin type, and
3. Use either an Airbus A330 or Boeing 737.

---

# 5. Result Count

The page should display the number of flights currently available.

The displayed count should be updated when filters are applied.

For example:

```text
28 flights found
```

After applying filters:

```text
6 flights found
```

---

# 6. Clear Filters

The user should be able to clear the selected filters and return to the complete result list.

Provide a clear and easily accessible action for resetting all filters.

Resetting the filters should:

- Remove all active filters.
- Restore the complete result list.
- Preserve the selected sorting option unless the product behavior explicitly requires otherwise.

---

# 7. No Results

If the selected filters do not match any flights, display an appropriate empty state.

The empty state should clearly communicate that no flights match the selected criteria.

The user should have an easy way to clear or modify the filters.

---

# 8. Interaction Between Sorting and Filtering

Sorting and filtering must work together.

For example:

1. The user selects `Soroush Air`.
2. The result list is filtered.
3. The user selects `Cheapest`.
4. The filtered results are sorted from the lowest price to the highest price.

Changing filters must not unexpectedly reset the sorting option.

Likewise, changing the sorting option must not remove the active filters.

---

# 9. Flight Card

Each result should be presented as a clear and distinguishable flight card.

The card should make it easy for users to compare flights.

At a minimum, the card should communicate:

- Airline
- Airline logo/icon
- Flight number
- Departure airport and city
- Departure time
- Arrival airport and city
- Arrival time
- Flight duration
- Number of stops
- Aircraft type
- Cabin type
- Baggage allowance
- Price
- Selection/action button

The information should be organized so that the most important information, especially departure, arrival, duration, airline, and price, is easy to find.

---

# 10. Responsive Behavior

The page should remain usable on different screen sizes.

The layout should adapt appropriately for:

- Desktop
- Tablet
- Mobile

The filter UI may be presented differently on smaller screens, such as using a drawer or modal instead of a permanent sidebar.

---

# 11. Design Reference

The provided image is a visual reference for the expected result-page layout.

The reference demonstrates the following major areas:

- Flight result cards
- Sorting controls
- Filter panel
- Flight information
- Price and selection action

The implementation does not need to reproduce the reference pixel by pixel, but the final UI should follow the same general information hierarchy and provide all required functionality described in this document.
