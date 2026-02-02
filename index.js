const express = require("express");
const cors = require("cors");
const app= express()
app.use(cors());
const {initializeDatabase} =require("./db/db.connect");
require("dotenv").config();
const Hotel = require("./models/hotel.models");
app.use(express.json())
initializeDatabase();

// const newHotel = {
    //BE2.1_HW2
//   name: "New Hotel",
//   category: "Mid-Range",
//   location: "123 Main Street, Frazer Town",
//   rating: 4.0,
//   reviews: [],
//   website: "https://hotel-example.com",
//   phoneNumber: "+1234567890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Room Service"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
//BE2.2_HW2
// name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
// };

//BE2.2_HW2

//2. Run the same function to create another hotel data in the database.

//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };
// 1. Write a function to create a new hotel data given below.

async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel)
        const saveHotel =await hotel.save()
        return saveHotel;
    }
    catch(error){
        throw error 
    }
}
app.post("/hotels", async (req,res) =>{
    try{
        const savedHotel = await createHotel(req.body)
        res.status(201).json({message:"Hotel added sucessfully"})
    }catch(error){
        res.status(500).json({error:"Failed to add hotel"})
    }
})

// createHotel(newHotel);

// 3. Create a function to read all hotels from the database. Console all the hotels. Use proper function and variable names.

async function readAllHotels(){
    try{
    const allHotels = await Hotel.find();
    return allHotels;
}catch(error){
    console.log(error);
}
}
// readAllHotels();
app.get("/hotels", async (req,res) => {
    try{
        const hotels = await readAllHotels()
        if(hotels.length != 0){
            res.json(hotels)
        } else{
            res.status(404).json({error:'No hotels found'})
        }
    }
        catch(error){
            res.status(500).json({error:"Failed to fetch hotels."})
        }
    
})
//4. Create a function to read a hotel by its name ("Lake View"). Console the restaurant details of Lake View hotel. Use proper function and variable names.
async function readAHotelByName(hotelName){
    try{
    const allHotels = await Hotel.findOne({name:hotelName});
    return allHotels;
}
    catch(error){
        console.log(error);

    }
}
// readAHotelByName("Lake View");
app.get("/hotels/:hotelName",async (req,res) =>{
    try{
        const hotel = await readAHotelByName(req.params.hotelName)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error:"Hotel not found"})
        }

    } catch(error){
        res.status(500).json({error:"Failed to fetch hotel."})
    }
})

// 5. Create a function to read all hotels which offers parking space. Console all the hotel details.

async function readAllHotelsOffersParking(offerParking){
    try{
        const allHotels= await Hotel.find({isParkingAvailable:offerParking});
        console.log(allHotels);
    }catch(error){
        console.log(error);
    }
}
// readAllHotelsOffersParking(true);
// 6. Create a function to read all hotels which has restaurant available. Console all the hotels.

async function readAllHotelsRestaurantAvailable(available){
    try{
        const allHotels= await Hotel.find({isRestaurantAvailable:available});
        console.log(allHotels);
    }catch(error){
        console.log(error);
    }
}
// readAllHotelsRestaurantAvailable(true);

// 7. Create a function to read all hotels by category ("Mid-Range"). Console all the mid range hotels.
async function readAllHotelsCategory(category){
    try{
        const allHotels= await Hotel.find({category:category});
        return allHotels;
    }catch(error){
        console.log(error);
    }
}
// readAllHotelsCategory("Mid-Range");
app.get("/hotels/category/:hotelCategory", async(req,res)=>{
    try{
        const hotels = await readAllHotelsCategory(req.params.hotelCategory)
        if(hotels.length != 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "No hotels found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch hotels"})
    }
})
// 8. Create a function to read all hotels by price range ("$$$$ (61+)"). Console all the hotels.

async function readAllHotelsByPriceRange(priceRange){
    try{
        const allHotels= await Hotel.find({priceRange:priceRange});
        console.log(allHotels);
    }catch(error){
        console.log(error);
    }
}
// readAllHotelsByPriceRange("$$$$ (61+)");
// 9. Create a function to read all hotels with 4.0 rating. Console the hotels.

async function readAllHotelsByRating(rating){
    try{
        const allHotels= await Hotel.find({rating:rating});
        return allHotels;
    }catch(error){
        console.log(error);
    }
}

// readAllHotelsByRating(4.0);
app.get("/hotels/rating/:hotelRating", async(req,res)=>{
    try{
        const hotels = await readAllHotelsByRating(req.params.hotelRating)
        if(hotels.length != 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "No hotels found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch hotels"})
    }
})
// 10. Create a function to read a hotel by phone number ("+1299655890"). Console the hotel data.
async function readHotelsByPhoneNumber(num){
    try{
        const allHotels= await Hotel.findOne({phoneNumber:num});
        return allHotels;
    }catch(error){
        console.log(error);
    }
}

// readHotelsByPhoneNumber("+1299655890");
app.get("/hotels/directory/:phoneNumber", async(req,res)=>{
    try{
        const hotels = await readHotelsByPhoneNumber(req.params.phoneNumber)
        if(hotels.length != 0){
            res.json(hotels)
        }else{
            res.status(404).json({error: "No hotels found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch hotels"})
    }
})
//BE2.3_HW2
// 1. Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel.
async function updateHotelData(hotelId,dataToUpdate){
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId,dataToUpdate,{new:true});
        console.log(updatedHotel);
    }
    catch(error){
        console.log("Error in updating Hotel checkoutTiming", error);
    }
}
// updateHotelData("6948de4e0750a1c4b35d3200",{checkOutTime:"11 AM"});
// 2. Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. Take the hotel which has the name "Sunset Resort" and update its rating to 4.2. Console the updated hotel.
async function acceptHotelName(hotelName, dataToUpdate){
    try{
    const updatedHotel = await Hotel.findOneAndUpdate({name:hotelName},dataToUpdate,{new:true});
    console.log(updatedHotel);
    }
    catch(error){
        console.log("Error in updating Rating",error);
    }
}
// acceptHotelName("Sunset Resort",{rating:"4.2"});

// 3. Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. Take the hotel which has the phone number "+1299655890" and update its phone number  to "+1997687392". Console the updated hotel details.

async function acceptHotelNumber(num, dataToUpdate){
    try{
    const updatedHotel = await Hotel.findOneAndUpdate({phoneNumber:num},dataToUpdate,{new:true});
    console.log(updatedHotel);
    }
    catch(error){
        console.log("Error in updating phone number",error);
    }
}
// acceptHotelNumber("+1299655890",{phoneNumber:"+1997687392"});


// BE2.4_HW2

// 1. Create a function deleteHotelById that accepts a hotel ID and deletes the hotel data from the db. Take any hotel id from your database and delete the records of that hotel.
async function deleteHotelById(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        console.log("Successfully completed",deletedHotel);
    }
    catch(error){
        console.log("Error in deleting the data ");

    }
}

// deleteHotelById("6948de4e0750a1c4b35d3200");


// 2. Create a function deleteHotelByPhoneNumber that accepts a hotel's phone number and deletes the hotel data from the db. Take any hotel phone number from your database and delete the records of that hotel.

async function deleteHotelByPhoneNumber(hotelPhoneNumber){
    try{
        const deletedHotel = await Hotel.findOneAndDelete({phoneNumber:hotelPhoneNumber});
        console.log("successfully Deleted", deletedHotel);
    }
    catch{
        console.log("error in deleting");
    }
}
// deleteHotelByPhoneNumber("+1997687392");/
async function deleteHotel(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    }catch(error){
        console.log(error);
    }
}

app.delete('/hotels/:hotelId', async (req,res) =>{
    try{
        const deletesHotel = await deleteHotel(req.params.hotelId)
        if(deletesHotel){
            res.status(200).json({message:"Hotel deleted successfully."});
        }
    }catch(error){
        res.status(500).json({error:"Failed to delete hotel."})
    }
} );
const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})
