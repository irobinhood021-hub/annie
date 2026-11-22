// Centralized content & assets for Annie's 18th Birthday Website

export const BIRTHDAY_DATA = {
  name: "Annie",
  fullName: "Annie",
  nickname: "Annie",
  aliases: ["Annie"],
  targetAge: 18,
  previousAge: 17,
  // Countdown target date: 23 November 2026
  targetDate: new Date('2026-11-23T00:00:00'),

  hero: {
    title: "Happy Birthday Annie",
    subtitle: "Wishing you a day filled with love, laughter, and all the happiness your heart can hold. May your 18th year bring you endless joy, bright adventures, and unforgettable memories. Happy Birthday!",
    tagline: "TO ANNIE • TURNING 18 TODAY"
  },

  // 20 Photos for the curved looping photo ribbon
  ribbonPhotos: [
    { id: 1, url: "/photos/photo-1.jpg", src: "/photos/photo-1.jpg", caption: "Sweet Smile ✨" },
    { id: 2, url: "/photos/photo-2.jpg", src: "/photos/photo-2.jpg", caption: "Golden Hour Glow ☀️" },
    { id: 3, url: "/photos/photo-3.jpg", src: "/photos/photo-3.jpg", caption: "Pure Elegance 🌸" },
    { id: 4, url: "/photos/photo-4.jpg", src: "/photos/photo-4.jpg", caption: "Candid Joy 💕" },
    { id: 5, url: "/photos/photo-5.jpg", src: "/photos/photo-5.jpg", caption: "Little Moments ☕" },
    { id: 6, url: "/photos/photo-6.jpg", src: "/photos/photo-6.jpg", caption: "Forever Muse 🌙" },
    { id: 7, url: "/photos/photo-7.jpg", src: "/photos/photo-7.jpg", caption: "Stargazer 💫" },
    { id: 8, url: "/photos/photo-8.jpg", src: "/photos/photo-8.jpg", caption: "In Full Bloom 🌷" },
    { id: 9, url: "/photos/photo-9.jpg", src: "/photos/photo-9.jpg", caption: "Unfiltered Laughs 💖" },
    { id: 10, url: "/photos/photo-10.jpg", src: "/photos/photo-10.jpg", caption: "Sunny Days 🌻" },
    { id: 11, url: "/photos/photo-11.jpg", src: "/photos/photo-11.jpg", caption: "Dreaming Awake ✨" },
    { id: 12, url: "/photos/photo-12.jpg", src: "/photos/photo-12.jpg", caption: "Soft Light 📸" },
    { id: 13, url: "/photos/photo-13.jpg", src: "/photos/photo-13.jpg", caption: "Cozy Vibes 🕊️" },
    { id: 14, url: "/photos/photo-14.jpg", src: "/photos/photo-14.jpg", caption: "Sunset Whispers 🌅" },
    { id: 15, url: "/photos/photo-15.jpg", src: "/photos/photo-15.jpg", caption: "Always Beautiful 🫶" },
    { id: 16, url: "/photos/photo-16.jpg", src: "/photos/photo-16.jpg", caption: "Annie's Glow 💌" },
    { id: 17, url: "/photos/photo-17.jpg", src: "/photos/photo-17.jpg", caption: "That Cute Smile 🥰" },
    { id: 18, url: "/photos/photo-18.jpg", src: "/photos/photo-18.jpg", caption: "Endless Charm 🤍" },
    { id: 19, url: "/photos/photo-19.jpg", src: "/photos/photo-19.jpg", caption: "Grace & Kindness 🌿" },
    { id: 20, url: "/photos/photo-20.jpg", src: "/photos/photo-20.jpg", caption: "Happy 18th Birthday Annie! 🎂" },
  ],

  // Scrapbook Draggable Polaroids & Secret Butterfly Notes
  scrapbook: {
    title: '"Happy Birthday, Annie!"',
    polaroids: [
      {
        id: "p1",
        label: "Cutie 💖",
        title: "Cutie 💖",
        image: "/photos/photo-21.jpg",
        rotation: -5,
        slot: "far-left",
        note: {
          title: "To My Favorite Smile ✨",
          text: "Looks like you're really good at catching butterflies... no wonder you caught my heart so effortlessly! Every moment with you feels like a page right out of a fairy tale. Happy 18th Birthday Annie! 🦋"
        }
      },
      {
        id: "p2",
        label: "Baddie 🔥",
        title: "Baddie 🔥",
        image: "/photos/photo-22.jpg",
        rotation: -2,
        slot: "mid-left",
        note: {
          title: "Unstoppable Energy 💫",
          text: "Confidence looks incredible on you, Annie! You light up every room you walk into, and watching you chase your dreams inspires me every single day. Keep shining your fierce light!"
        }
      },
      {
        id: "p3",
        label: "My Life 🫶",
        title: "My Life 🫶",
        image: "/photos/photo-23.jpg",
        rotation: 0,
        slot: "center",
        note: {
          title: "My Whole World 🌸",
          text: "They say home is a place, but for me, home is whenever I'm talking to you. You make ordinary days feel like once-in-a-lifetime celebrations. Happy 18th Birthday, Annie!"
        }
      },
      {
        id: "p4",
        label: "Dream Girl ✨",
        title: "Dream Girl ✨",
        image: "/photos/photo-24.jpg",
        rotation: 3,
        slot: "mid-right-bottom",
        note: {
          title: "Pure Magic 🌙",
          text: "If I had a flower for every time you made me smile, I could walk through an endless garden. Thank you for simply existing and being the most wonderful soul, Annie!"
        }
      },
      {
        id: "p5",
        label: "Bestie 🥰",
        title: "Bestie 🥰",
        image: "/photos/photo-25.jpg",
        rotation: 8,
        slot: "top-right",
        note: {
          title: "Golden Hour Glow ☀️",
          text: "You radiate so much warmth and beauty wherever you go. Life is so much brighter, happier, and sweeter with you in it!"
        }
      },
      {
        id: "p6",
        label: "Always You ❤️",
        title: "Always You ❤️",
        image: "/photos/photo-26.jpg",
        rotation: -4,
        slot: "far-right-bottom",
        note: {
          title: "Forever & Always 💌",
          text: "No matter how many birthdays pass, one thing will never change: I will always be right here, cheering for you, loving you, and celebrating every single thing that makes you Annie."
        }
      }
    ],
    stickers: [
      {
        text: "Love you more than words can hold. Happy 18th Birthday Annie! 🎂",
        pos: "right-top"
      },
      {
        text: "To our gorgeous Annie, forever shining bright! ❤️✨",
        pos: "left-bottom"
      }
    ]
  },

  // VOGUE Magazine Special Edition Spreads
  magazine: {
    totalSpreads: 4,
    spreads: [
      {
        pageLeft: {
          tag: "ISSUE NO. 18 • SPECIAL EDITION",
          headline: "VOGUE",
          subheadline: "BIRTHDAY SPECIAL EDITION",
          ornament: "✦ THE ART OF CELEBRATION ✦",
          title: "ANNIE",
          description: "Celebrating the most extraordinary muse on her 18th milestone. A portrait of elegance, grace, kindness, and eternal sunshine that illuminates every single day.",
          quote: "“Some people bring out the worst in you, others bring out the best, and then there are rare people like Annie who bring out the most magical.”"
        },
        pageRight: {
          title: "Who's that girl?",
          images: [
            "/photos/photo-27.jpg",
            "/photos/photo-28.jpg",
            "/photos/photo-29.jpg",
            "/photos/photo-30.jpg",
            "/photos/photo-31.jpg",
            "/photos/photo-32.jpg"
          ],
          note: "Happy 18th Birthday Annie! 💕"
        }
      },
      {
        pageLeft: {
          tag: "TABLE OF CONTENTS",
          headline: "MEMOIRS",
          subheadline: "CHAPTER 18",
          ornament: "✦ CHRONICLES OF GRACE ✦",
          title: "WHY YOU OWN MY HEART",
          description: "1. The sound of your real, unfiltered laugh\n2. How deeply and sincerely you care for people\n3. The way your eyes sparkle when you're excited\n4. Your calm presence in a chaotic world\n5. Simply being you, Annie — my favorite blessing.",
          quote: "“You don't just exist, you make the world a gentler place.”"
        },
        pageRight: {
          title: "Golden Hour Reverie",
          images: [
            "/photos/photo-33.jpg",
            "/photos/photo-34.jpg",
            "/photos/photo-35.jpg",
            "/photos/photo-36.jpg"
          ],
          note: "Forever in your frame ✨"
        }
      },
      {
        pageLeft: {
          tag: "SOUNDTRACK OF US",
          headline: "PLAYLIST",
          subheadline: "VOGUE MUSIC EDIT",
          ornament: "✦ MELODIES ON REPEAT ✦",
          title: "FAVOURITE SONGS",
          description: "Tracks that feel like warm coffee on a rainy morning, long drives under pastel skies, and every memory spent laughing with you.",
          quote: "“If songs had souls, this playlist would whisper your name.”"
        },
        pageRight: {
          title: "Now Playing: 'Happy Birthday Tune'",
          images: [
            "/photos/photo-37.jpg",
            "/photos/photo-1.jpg",
            "/photos/photo-2.jpg",
            "/photos/photo-3.jpg"
          ],
          note: "Track 01 • Infinite Repeat 🎶"
        }
      },
      {
        pageLeft: {
          tag: "A BIRTHDAY LETTER",
          headline: "FOREVER",
          subheadline: "SPECIAL DEDICATION",
          ornament: "✦ THE FINAL WISH ✦",
          title: "DEAR ANNIE",
          description: "May your 18th year be as breathtaking as a sunset over the ocean. May all your dreams find wings and take flight. You deserve every ounce of happiness in this universe, Annie.",
          quote: "“Happy 18th Birthday to our favorite girl in the entire world, Annie!”"
        },
        pageRight: {
          title: "Forever Love",
          images: [
            "/photos/photo-4.jpg",
            "/photos/photo-5.jpg",
            "/photos/photo-6.jpg",
            "/photos/photo-7.jpg"
          ],
          note: "Signed with all my love ❤️"
        }
      }
    ]
  }
};
