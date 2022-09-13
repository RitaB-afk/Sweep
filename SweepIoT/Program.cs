using System.IO.Ports;
using System.Net.Http.Json;
using System.Text.RegularExpressions;

var client = new HttpClient();
string currentStatus = "NoCleaning";


while (true) {
    Console.WriteLine("Checking servo");
    CheckServo();
    Thread.Sleep(10000);
}

void CheckServo () {
    string servo = string.Empty;
 
    var SP = new SerialPort();
    SP.PortName = "com4";
    SP.BaudRate = 9600;
    SP.ReadTimeout = 500;

    SP.DataReceived += (s, e) =>
    {
        var data = SP.ReadExisting();
        servo += data.ToString();
        var match = Regex.Match(servo, @"angle.*([0-9]{2,3}).*", RegexOptions.IgnorePatternWhitespace);
        if (match.Success)
        {
            if (int.TryParse(match.Value.Replace("angle: ", string.Empty), out int angle)) {
                Console.WriteLine(angle);

                var status = string.Empty;
                if (angle < 50)
                    status = "NoCleaning";
                if (angle > 50)
                    status = "Cleaning";
                if (angle > 100)
                    status = "DoNotDisturb";

                if (status != currentStatus)
                {
                    Console.WriteLine($"Changing from {currentStatus} to {status}");
                    currentStatus = status;
                    client.PutAsync("https://localhost:7104/api/room/servodata", JsonContent.Create(new
                    {
                        SerialNumber = "12345",
                        Status = currentStatus
                    }));
                    SP.Close();
                    return;
                }
            }
            servo = string.Empty;
        }
    };
    
    SP.Open();
    Thread.Sleep(10000);
    SP.Close();
    Console.WriteLine("No change");
}

