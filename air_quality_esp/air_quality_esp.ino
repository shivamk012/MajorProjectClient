#include <WiFi.h>
#include<HTTPClient.h>
#include <MQUnifiedsensor.h>
#include <TinyGPS++.h>//NEO 6M gps
#include <HardwareSerial.h>

char ssid[] = "Shivam 4G";    
char password[] = "shivamk012";

String Key = "e_UAi2abSTUnMr7QxZ-i_3gAOdDH_OHTf6UMLs1GKRb"; //your webhooks key
String event_name = "button_pressed"; 

TinyGPSPlus gps;
#define         Pin4     (34)  //Analog input 0 of your arduino
#define         Pin135   (35)  //Analog input 6 of your arduino
#define         Board                   ("ESP-32")
#define         RatioMQ135CleanAir        (3.6) //RS / R0 = 10 ppm 
#define         RatioMQ3CleanAir        (60) // Ratio of your sensor, for this example an MQ-3
#define         ADC_Bit_Resolution        (12) // 10 bit ADC 
#define         Voltage_Resolution        (3.3) // Volt resolution to calc the voltage
#define         Type                      ("ESP-32") //Board used

MQUnifiedsensor MQ135(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin135, Type);
MQUnifiedsensor MQ3(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin4, Type);
String cdata;
String GPS;
int Switch=27,yellow=25,green=26;
HardwareSerial SerialGPS(1);
String latitude , longitude;
int a=0,b=0;
void setup()
{
  pinMode(Switch,INPUT_PULLUP);
  pinMode(yellow,OUTPUT);
  pinMode(green,OUTPUT);
  Serial.begin(9600);
  SerialGPS.begin(9600, SERIAL_8N1, 16, 17);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.print("Connecting Wifi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  Serial.print(".");
  delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  IPAddress ip = WiFi.localIP();
  MQ3.init();
  MQ3.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ3.setA(4.8387); MQ3.setB(-2.68); // Configure the equation to to calculate Benzene concentration
  MQ135.init();
  MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ135.setR0(9.03);
  MQ3.serialDebug(true);
}

void loop()
{
  MQ3.update();
  MQ135.update();
  MQ135.setA(605.18); MQ135.setB(-3.937);
  float CO = MQ135.readSensor();

  MQ135.setA(77.255); MQ135.setB(-3.18);
  float Alcohol = MQ135.readSensor();

  MQ135.setA(110.47); MQ135.setB(-2.862);
  float CO2 = MQ135.readSensor();
  MQ135.setA(44.947); MQ135.setB(-3.445);
  float Toluen = MQ135.readSensor();

  MQ135.setA(102.2 ); MQ135.setB(-2.473);
  float NH4 = MQ135.readSensor();

  MQ135.setA(34.668); MQ135.setB(-3.369);
  float Aceton = MQ135.readSensor();

  while (SerialGPS.available() > 0)
    if (gps.encode(SerialGPS.read()))
    {
      if (gps.location.isValid())
      {
        latitude = String(gps.location.lat() , 6);
        longitude = String(gps.location.lng() , 6);
      }
    }

  latitude = "22.714500";
  longitude = "75.915500";

  cdata = cdata + CO + "," + Alcohol + "," + CO2 + "," + Toluen + "," + NH4 + "," + Aceton;
  GPS=GPS+latitude + "," + longitude;
  Serial.print(cdata);
 Serial.print("      ");
  Serial.println(GPS);
//if(digitalRead(Switch)==LOW)
//{
//  b=1;
//digitalWrite(green,HIGH);
//}
//if(b==1)
//{
a++;
delay(1000);
digitalWrite(green,LOW);
//}
if(a==60)
{
  digitalWrite(yellow,HIGH);
  email();
  digitalWrite(yellow,LOW);
 a=0;
 b=0;
}
  cdata = "";
  GPS="";
}

void email()
{
HTTPClient http;
http.begin("http://maker.ifttt.com/trigger/"+event_name+"/with/key/"+Key+"?value1="+cdata+"&value2="+GPS);
http.GET();
http.end();
delay(1000);
}
