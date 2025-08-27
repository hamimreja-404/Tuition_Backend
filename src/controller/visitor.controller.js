import { Visitor } from "../models/visitor.model.js";

const incrementVisitorCount = async (req, res) => {
  try {
    const visitorCounter = await Visitor.findOneAndUpdate(
      {}, // An empty filter matches the first document found
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    // Send a success response back to the client.
    res.status(200).json({
      success: true,
      message: "Visitor count incremented.",
      count: visitorCounter.count,
    });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating visitor count.",
    });
  }
};

const getVisitorCount = async (req, res) => {
  try {
    const visitorCounter = await Visitor.findOne({});

    // If the counter exists, return its count.
    // If it doesn't exist yet (i.e., no one has visited), return 0.
    const count = visitorCounter ? visitorCounter.count : 0;

    res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching visitor count.",
    });
  }
};

// Export the functions to be used in your routes file
export {incrementVisitorCount, getVisitorCount};
