### NYPD Crime


Our project is to uncover patterns in criminal activity around New York City. We'll examine relationships between types of crime and location; crime rates and gender; trends in crime rates over age group; and related questions, as the data admits.

We found the dataset on [Data.gov](https://catalog.data.gov/dataset?publisher=data.cityofnewyork.us&organization=city-of-new-york) called, “[NYPD Arrest Data (Year to Date)](https://catalog.data.gov/dataset/nypd-arrest-data-year-to-date),” every arrest effected in NYC by the NYPD during the current year.

We used the NYPD Crime JSON API to retrieve all the arrests and locations of all of the crime in New York.
We used Plotly to create three graphs:
* Bar Chart: Crime Rate- Female vs. Male
* Pie Chert: Crime Rate per Age Group
* Bar Chart: Crime Rate per Neighborhood

Using Leaflet we created a base map of NYC with three layers. Markers were added for some specific crimes: RAPE, MURDER, ROBBERY and categorised the rest as "OTHER" to display the crime distribution in the city. For each category there is an overlay created to filter through the different crimes.

The retrived data was stored in MongoDB.



