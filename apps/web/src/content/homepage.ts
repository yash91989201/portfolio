export type Availability = {
	open: boolean;
	label: string;
};

export type SocialLink = {
	kind: "github" | "linkedin" | "email";
	href: string;
	label: string;
};

export type Profile = {
	name: string;
	promptName?: string;
	availability: Availability;
	rolesLine: string;
	bioSegments?: (string | { accent: string })[];
	email: string;
	location: string;
	statusNote: string;
	stackLine: string;
	links: SocialLink[];
	scheduleUrl?: string;
};

export type Project = {
	index: number;
	title: string;
	year: string;
	role: string;
	description: string;
	liveUrl?: string;
	featured: boolean;
};

export const profile: Profile = {
	availability: {
		label: "Available for projects",
		open: true,
	},
	bioSegments: [
		"I build ",
		{ accent: "web products end to end" },
		", from the interface and APIs to deployment. Most of my work is in TypeScript, React, TanStack, PostgreSQL, and Go, and I like keeping things ",
		{ accent: "practical, fast, and easy to maintain" },
		".",
	],
	email: "yashraj6370@gmail.com",
	links: [
		{
			href: "https://github.com/yash91989201",
			kind: "github",
			label: "GitHub profile",
		},
		{
			href: "https://www.linkedin.com/in/yashraj-jaiswal-91989201s/",
			kind: "linkedin",
			label: "LinkedIn profile",
		},
		{
			href: "mailto:yashraj6370@gmail.com",
			kind: "email",
			label: "Send email",
		},
	],
	location: "Joda Basti Odisha India",
	name: "Yashraj",
	promptName: "Yash",
	rolesLine: "Full-Stack Developer | DevOps Engineer | India - Remote",
	stackLine: "Ts / NextJS / Tanstack / Postgres / GoLang",
	statusNote: "Currently open to freelance and collaboration",
};

export const projects: Project[] = [
	{
		description:
			"A travel portal for comparing riverside resorts near Jim Corbett National Park and requesting stay quotes.",
		featured: true,
		index: 1,
		liveUrl: "https://corbettriversideresort.com/",
		role: "Web Developer",
		title: "Corbett Riverside Resort",
		year: "2026",
	},
	{
		description:
			"A fast, keyboard-first project-management and issue-tracking platform for software teams to plan work, track bugs, manage releases, and monitor progress.",
		featured: true,
		index: 2,
		liveUrl: "https://github.com/yash91989201/sprint-stack",
		role: "Full-Stack Developer",
		title: "Sprint Stack",
		year: "2026",
	},
	{
		description:
			"A hyper-connected workspace operating system that brings teams, channels, and real-time presence into a unified interface across web and native apps.",
		featured: true,
		index: 3,
		liveUrl: "https://github.com/vivek-workholo/workholo",
		role: "Contributor",
		title: "Workholo",
		year: "2026",
	},
];

export type Experience = {
	index: number;
	role: string;
	company: string;
	logo?: string;
	period: string;
	duration: string;
	location: string;
	skills: string[];
	current?: boolean;
};

export const experiences: Experience[] = [
	{
		company: "WorkHolo",
		current: true,
		duration: "2 yrs 2 mos",
		index: 1,
		location: "Raj Nagar, Dwarka, New Delhi · Remote",
		logo: "/assets/workholo-logo.webp",
		period: "Jul 2024 – Present",
		role: "Full Stack Engineer",
		skills: ["IT Services", "Software Design"],
	},
	{
		company: "FynTune Solution Private Limited",
		duration: "1 yr 4 mos",
		index: 2,
		location: "Remote",
		logo: "/assets/fyntune-logo.png",
		period: "Dec 2022 – Mar 2024",
		role: "Frontend Web Developer",
		skills: ["Web Development", "Front-End Development"],
	},
];
