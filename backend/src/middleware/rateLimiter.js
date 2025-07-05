import ratelimit from "../config/upstash.js";

const rateLimoter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
    next(error);
  }
};

export default rateLimoter;
