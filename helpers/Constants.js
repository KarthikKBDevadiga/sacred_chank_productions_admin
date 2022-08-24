const Constants = {
  COUPON_TYPES: [
    { id: "ALL", title: "All", disabled: false },
    { id: "GENERAL_COUPON", title: "General Coupon", disabled: false },
    { id: "COURSE_COUPON", title: "Course Coupon", disabled: true },
    { id: "OFFER", title: "Offer", disabled: false },
  ],
  DISCOUNT_TYPES: [
    { id: "ALL", title: "All", disabled: false },
    { id: "AMOUNT", title: "Amount", disabled: false },
    { id: "PERCENTAGE", title: "Percentage", disabled: false },
    { id: "FREE", title: "Free", disabled: true },
  ],
  WEEK_DAYS: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
};

export default Constants;
