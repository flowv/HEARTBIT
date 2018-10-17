# HEARTBIT WALKS

![alt text](/HBW_Header.jpg)

London Festival of Architecture 2018
Code Repository 

// INTRO

The section of the River Lee that borders the east side of Hackney Wick, branching to the west into the Hertford Union Canal, houses a culturally diverse community of active users, ranging from cycling and pedestrian commuters, to residential boats owners, runners, passers-by and to less fortunate rough sleepers. Despite its popularity, the canal walk suffers of environmental and security issues, with water pollution, shadowy underpasses and bottlenecks being only some of the factors that contribute to a rough appearance and an increased perception of crime risk after dusk.

The HeartBit Walks project intends to collect detailed emotional insights on the current use of the canal walk, ultimately aiming at raising the awareness of risk perception in the area. By mapping the affective reaction of selected participants to the canal walks and with the publication of the resulting emotional maps in an online archive, the project intends to offer a platform for the exploration of the diverse identities in the area and an opportunity for the local community to build an empowering diary of its collective voice.

The project is articulated in two parts. A workshop open to UCL Bartlett BPro Urban Design students will take place at the Bartlett School of Architecture in May. The two-day workshop will focus on the construction of wearable sensing devices that, drawing on methods pioneered by artist Christian Nold in 2007, will be used to collect combined biometric (galvanic-skin response) and GPS information. Further, the project will continue as a two-day event part of the London Festival of Architecture. The event will take place at UCL Here East and along the nearby canal walks, where selected participants will be invited to test the sensing devices during explorative local walks.

// Code Repository

This repository contains the code files for the Heartbit Walks. The data have been logged by seven Arduino-based mobile units. These units recoded the time, location and galvanic skin response of each participant and saved them into a .csv file. 
The code for the Arduino unit and the resulting csv files are available in this repository. 

// Parts List

The data-logger consists of different parts that need to be purchased separately. Below the list and the specs:
Arduino UNO: this forms the heart of the datalogger. You can purchase it separately or as part of a larger set
GSR Skin Sensor: this measures the galvanic skin response and transmits the data to the Arduino 
Seeed 101020052 Grove - GSR Galvanic Skin Response with Finger Sensors
GPS Module: this one provides you with the location, date and time. There are quite a few modules around and I happen to use this one.
SIM shield: this shield is to be mounted onto the Arduino, it has a little slot for an external microSD. The collected data are combined on the Arduino and written onto the SD.
SD Card
9V battery and battery jack.
Jumper wires.

Creating the box
We decided to build an acrylic box to protect the data-logger. The acrylic sheets have been cut with a laser cutter and glued together with acrylic cement. The box consists of a lower and upper part, fixed by screws and nuts. 
The Arduino sits on nylon spacers and these spacers are fixed into pre cut holes in the acrylic sheet.
The file to cut out the acrylic sheets can be downloaded here.

The box worked quite well in field conditions, but should be considered as a The box is a prototype, so if I would do it a second time, I would give going to do it a second time, I would choose the same principle but reduce it in size, give it more shape and possibly use coloured acrylic sheets. 

