# HEARTBIT WALKS

![alt text](/HBW_Header.jpg)

London Festival of Architecture 2018
Code Repository 

## INTRO

The HeartBit Walks were an event during the London Festival of Architecture 2018. It took place the 1st and 2nd of June at the Here East in Hackney Wick, London.

The goal of this event was to create an emotional map of Hackney by measuring and mapping the galvanic skin response of the participants. The data were collected with an Arduino based data logger that measures the stress level on the skin and saves it alongside with the time and geographic location onto an SD drive. Clearing, evaluation and visualisation of the data was done in p5.js, Houdini and Grasshopper. Partly on the spot, partly later.

This repository contains the codes, results, images, parts list and instructions to recreate this event on your own or – more likely – to take bits and pieces for your own project.

The text below has been used to advertise the event and puts this repository into a wider perspective.

>The section of the River Lee that borders the east side of Hackney Wick, branching to the west into the Hertford Union Canal, houses a culturally diverse community of active users, ranging from cycling and pedestrian commuters, to residential boats owners, runners, passers-by and to less fortunate rough sleepers. Despite its popularity, the canal walk suffers of environmental and security issues, with water pollution, shadowy underpasses and bottlenecks being only some of the factors that contribute to a rough appearance and an increased perception of crime risk after dusk.

>The HeartBit Walks project intends to collect detailed emotional insights on the current use of the canal walk, ultimately aiming at raising the awareness of risk perception in the area. By mapping the affective reaction of selected participants to the canal walks and with the publication of the resulting emotional maps in an online archive, the project intends to offer a platform for the exploration of the diverse identities in the area and an opportunity for the local community to build an empowering diary of its collective voice.

>The project is articulated in two parts. A workshop open to UCL Bartlett BPro Urban Design students will take place at the Bartlett School of Architecture in May. The two-day workshop will focus on the construction of wearable sensing devices that, drawing on methods pioneered by artist Christian Nold in 2007, will be used to collect combined biometric (galvanic-skin response) and GPS information. Further, the project will continue as a two-day event part of the London Festival of Architecture. The event will take place at UCL Here East and along the nearby canal walks, where selected participants will be invited to test the sensing devices during explorative local walks.

![alt text](/HBW_Stand.jpg)

## Open Source

The technical research and the development of the HeartBit Walks would not have happened without “open source” and freely available software. [Arduino](https://www.arduino.cc/) makes it possible to program a microprocessor, [QGIS](https://qgis.org/en/site/) offers mapping and spatial analysis tools and [p5.js](https://p5js.org/) is an allrounder when it comes to data visualisation. YouTube, Vimeo and countless blogs were of tremendous help in the putting it all together. 

I don’t know how long it would have taken me without all this. Most likely, it wouldn’t have happed without the help of so many people out there. I don’t really expect that anybody will recreate the data-logger one-to-one, but I hope that somebody might find this repository useful. And for me, it’s one way to show my gratitude to all those who spend their time in developing freely available -and transparent- codes.)

A very thank goes  to all the participants who shared their experiences and time. All the results are now online – obviously anonymised. So, no worries!

![alt text](HEARTBIT/HBW Data Logger 2.jpg)


## Code Repository

The mobile data-logger is at the heart of this experiment. It’s an Arduino based unit that collects the location, the time and the galvanic skin response. 
The repository contains all the details one needs to know in order to recreate the data-logger and the event. 

## Parts List

The data-logger consists of different parts that need to be purchased separately. Below the list and the specs:
- Arduino UNO: this forms the heart of the datalogger. You can purchase it separately or as part of a larger set
- GSR Skin Sensor: this measures the galvanic skin response and transmits the data to the Arduino 
Seeed 101020052 Grove - GSR Galvanic Skin Response with Finger Sensors
- GPS Module: this one provides you with the location, date and time. There are quite a few modules around and I happen to use this one.
- SIM shield: this shield is to be mounted onto the Arduino, it has a little slot for an external microSD. The collected data are combined on the Arduino and written onto the SD.
- SD Card
- 9V battery and battery jack.
- Jumper wires.


## The Code
The data have been logged by seven Arduino-based mobile units. These units recoded the time, location and galvanic skin response of each participant and saved them into a .csv file. 
The code for the Arduino unit and the resulting csv files are available in this repository. 

## CSV Files

This information was saved on an SD card. Participants were invited to share their observations, these were added manually to the file. 
Obviously, all the records are anonimised and this allows us to share them too.


## Creating the box

We decided to build an acrylic box to protect the data-logger. The acrylic sheets have been cut with a laser cutter and glued together with acrylic cement. The box consists of a lower and upper part, fixed by screws and nuts. 
The Arduino sits on nylon spacers and these spacers are fixed into pre cut holes in the acrylic sheet.
The file to cut out the acrylic sheets can be downloaded here.

The box worked quite well in field conditions, but should be considered as a The box is a prototype, so if I would do it a second time, I would give going to do it a second time, I would choose the same principle but reduce it in size, give it more shape and possibly use coloured acrylic sheets. 

![alt text](HEARTBIT/HBW_Data Logger.jpg)

