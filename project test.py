from pubnub.pubnub import PubNub, SubscribeCallback, PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.exceptions import PubNubException
import RPi.GPIO as GPIO
from hx711 import HX711
import threading
from mfrc522 import SimpleMFRC522
import sys
GPIO.setwarnings(False)

class MyListener(SubscribeCallback):
    def __init__(self):
        self.login = False
        self.stop_scan_event = threading.Event()

    def status(self, pubnub, status):
        pass

    def message(self, pubnub, message):
        if message.message == 'logoff':
            self.stop_scan_event.set()
            self.login = True
        else:
            # Handle other messages
            pass

#    def presence(self, pubnub, presence):
#        pass
def scan_barcode(listener):
    while True:
      
        try:
                barcode = input("Scan a barcode: ")
                pubnub.publish().channel('Quentinchannel').message(barcode).sync()
           
                GPIO.setmode(GPIO.BCM)
                dout_pin=21
                pd_sck_pin=20
                GPIO.setup(pd_sck_pin,GPIO.OUT)
                GPIO.setup(dout_pin,GPIO.IN)
 
                hx = HX711(dout_pin, pd_sck_pin)
    
                print(hx._read())
                weight = round((hx._read()+185057)/493720,3)
                pubnub.publish().channel('Quentinchannel').message({'id':barcode,'weight':weight}).sync()
                hx.reset()
                
        except Exception as e:
            print("Error:", e)
            GPIO.cleanup()
            sys.exit()
        finally:
            GPIO.cleanup()
        
pnconfig = PNConfiguration()
pnconfig.subscribe_key = 'sub-c-86ec8e7a-ac60-48f6-bbb5-62eb95d3f71d'
pnconfig.publish_key = 'pub-c-dd3b5703-eb03-43f7-bbf2-a58261067c8f'
pnconfig.uuid = 'tchuilej7253'
pubnub = PubNub(pnconfig)
channel = 'Quentinchannel'

my_listener = MyListener()

pubnub.add_listener(my_listener)
pubnub.subscribe().channels(channel).execute()

while True:
    if not my_listener.login:
        print("Please place your card near the reader")
        reader = SimpleMFRC522()
        try:
            id, text = reader.read()
            if id:
                my_listener.login = True
                print(text)
                print("User Id read:" + str(id))
                pubnub.publish().channel(channel).message({'user':text}).sync()
                print("Publish use ID to PubNub:", id)
        finally:
            GPIO.cleanup()
    else:

         barcode_thread= threading.Thread(target=scan_barcode, args=(my_listener,))
         barcode_thread.start()
         barcode_thread.join()

          
          
          


def publish_callback(result, status):
    if not status.is_error():
        print("Message published successfully")
    else:
        print("Failed to publish message")

