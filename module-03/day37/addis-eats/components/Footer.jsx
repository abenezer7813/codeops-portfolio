import { FaCoffee } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#fff1e9] px-[22px] py-10 text-[#554642] sm:px-[30px] sm:py-[55px]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-[55px]">

        {/* Brand */}
        <div>
          <h2 className="mb-4 font-serif text-[25px] font-bold leading-tight text-[#8b2515] lg:text-[28px]">
            Mesob House
          </h2>

          <p className="mb-3 text-[15px] leading-[1.7] lg:text-base">
            Sharing traditions from the Ethiopian
            <br />
            highlands — one Gursha at a time.
          </p>

          <div className="mt-[13px] flex max-w-full items-center gap-[11px] rounded-[11px] bg-[#fbe4da] px-3 py-[15px] text-sm leading-[1.45] sm:max-w-[340px]">
            <FaCoffee className="shrink-0 text-[21px] text-[#9a6900]" />

            <span>
              Traditional Coffee Ceremony daily
              <br />
              at 4:00 PM
            </span>
          </div>
        </div>

        {/* Hospitality Hours */}
        <div>
          <h3 className="mb-[14px] text-lg font-medium leading-tight tracking-[0.2px] text-[#282321] lg:mb-[18px] lg:text-xl">
            HOSPITALITY HOURS
          </h3>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Tuesday – Sunday: 11:30 AM – 11:00 PM
          </p>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Monday: Reserved for Private
            <br />
            Banquets
          </p>

          <strong className="mt-[14px] block text-xs font-bold leading-[1.4] text-[#916000] lg:text-[13px]">
            Jebena Buna & Fresh Roasting All Evening
          </strong>
        </div>

        {/* Guest Account */}
        <div>
          <h3 className="mb-[14px] text-lg font-medium leading-tight tracking-[0.2px] text-[#282321] lg:mb-[18px] lg:text-xl">
            GUEST ACCOUNT & TRADITIONS
          </h3>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Sign In to Mesob Rewards
          </p>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Create Member Profile
          </p>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Vegan Fasting (Beyaynetu / Tsom)
          </p>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            House Tej (Pure Honey Wine)
          </p>
        </div>

        {/* Location */}
        <div>
          <h3 className="mb-[14px] text-lg font-medium leading-tight tracking-[0.2px] text-[#282321] lg:mb-[18px] lg:text-xl">
            ADDIS LOCATION
          </h3>

          <p className="mb-3 text-[15px] leading-[1.6] lg:text-base">
            Bole Medhanialem, Addis Ababa &
            <br />
            express delivery across town.
          </p>

          <a
            href="tel:+251911234567"
            className="mt-0 inline-block text-base font-semibold text-[#982512] no-underline hover:underline lg:text-[17px]"
          >
            +251 911 234 567
          </a>

          <div className="mt-5 flex items-center gap-[17px] text-[19px] text-[#5b4c48]">
            {/* Social icons */}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto mt-[42px] flex max-w-[1600px] flex-col items-start gap-[18px] pb-[55px] sm:mt-[50px] lg:mt-[72px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pb-0">
        <p className="m-0 text-[13px] leading-[1.6] text-[#907873] lg:text-sm">
          © 2025 Mesob House Habesha Dining. Authentic Ethiopian & Eritrean Heritage.
        </p>

        <div className="flex flex-wrap gap-[14px] lg:gap-[23px]">
          <a
            href="#"
            className="text-[13px] text-[#907873] no-underline hover:text-[#8b2515] lg:text-sm"
          >
            Gursha Hospitality
          </a>

          <a
            href="#"
            className="text-[13px] text-[#907873] no-underline hover:text-[#8b2515] lg:text-sm"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="text-[13px] text-[#907873] no-underline hover:text-[#8b2515] lg:text-sm"
          >
            Terms of Table
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

