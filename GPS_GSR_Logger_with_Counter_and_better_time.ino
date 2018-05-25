#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <SPI.h>
#include <SD.h>



TinyGPSPlus gps;
SoftwareSerial sc_gps(8, 9); //connect wires to RX=pin 8, TX=pin 9
const int chipSelect = 4;
const int GSR = A0;
int sensorValue = 0;
int gsr_average = 0;
unsigned int counter;

void setup() {

  sc_gps.begin(9600);
  SD.begin(chipSelect);
  SD.remove("datalog.csv");
  String Header = "Count\tDate\tTime\tLat\tLong\tSpeed\tAltitude\tGSR";
  File dataFile = SD.open("datalog.csv", FILE_WRITE);
  if (dataFile)
  {
    dataFile.println(Header);
    dataFile.close();
  }
  counter = 0;

  if (Serial) {
    Serial.begin(9600);
    Serial.println(Header);
  }


  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  digitalWrite(13, HIGH);
}

void loop()
{
  long sum = 0;
  String Data = "";

  for (int i = 0; i < 10; i++)    //Average the 10 measurements to remove the glitch
  {
    sensorValue = analogRead(GSR);
    sum += sensorValue;
    delay(5);
  }
  gsr_average = sum / 10;


    
  

  while (sc_gps.available())
  {
    gps.encode(sc_gps.read());
  }
  if (gps.location.isUpdated())
  {

    Data.concat(counter);
    Data.concat("\t");
    Data.concat(String(gps.date.day()));
    Data.concat("/");
    Data.concat(String(gps.date.month()));
    Data.concat("/");
    Data.concat(String(gps.date.year()));
    Data.concat("\t");
    Data.concat(String(gps.time.hour()));
    Data.concat(":");
    Data.concat(String(gps.time.minute()));
    Data.concat(":");
    Data.concat(String(gps.time.second()));
    Data.concat("\t");
    Data.concat(String(gps.location.lat(), 6));
    Data.concat("\t");
    Data.concat(String(gps.location.lng(), 6));
    Data.concat("\t");
    Data.concat(String(gps.speed.kmph()));
    Data.concat("\t");
    Data.concat(String(gps.altitude.meters()));
    Data.concat("\t");
    Data.concat(gsr_average);

    if (Serial) {
      Serial.println(Data);
    }

    File dataFile = SD.open("datalog.csv", FILE_WRITE);
    if (dataFile)
    {
      dataFile.println(Data);
      dataFile.close();
    }
    counter = counter + 1;

    //    delay(1000);
  }
}



