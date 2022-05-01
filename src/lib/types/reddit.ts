export interface About {
	kind: 't5';
	data: {
		user_flair_background_color: string;
		submit_text_html: any;
		restrict_posting: boolean;
		user_is_banned: any;
		free_form_reports: boolean;
		wiki_enabled: boolean;
		user_is_muted: any;
		user_can_flair_in_sr: any;
		display_name: string;
		header_img: any;
		title: string;
		original_content_tag_enabled: boolean;
		allow_galleries: boolean;
		icon_size: any;
		primary_color: string;
		active_user_count: number;
		icon_img: string;
		display_name_prefixed: string;
		accounts_active: number;
		public_traffic: boolean;
		subscribers: number;
		user_flair_richtext: Record<string, string>[];
		videostream_links_count: number;
		name: string;
		quarantine: boolean;
		hide_ads: boolean;
		prediction_leaderboard_entry_type: string;
		emojis_enabled: boolean;
		advertiser_category: string;
		public_description: string;
		comment_score_hide_mins: number;
		allow_predictions: boolean;
		user_has_favorited: any;
		user_flair_template_id: any;
		community_icon: string;
		banner_background_image: string;
		header_title: any;
		community_reviewed: boolean;
		submit_text: string;
		description_html: any;
		spoilers_enabled: boolean;
		allow_talks: boolean;
		header_size: any;
		user_flair_position: string;
		all_original_content: boolean;
		has_menu_widget: boolean;
		is_enrolled_in_new_modmail: any;
		key_color: string;
		can_assign_user_flair: boolean;
		created: number;
		wls: number;
		show_media_preview: boolean;
		submission_type: string;
		user_is_subscriber: any;
		disable_contributor_requests: boolean;
		allow_videogifs: boolean;
		should_archive_posts: boolean;
		user_flair_type: string;
		allow_polls: boolean;
		collapse_deleted_comments: boolean;
		emojis_custom_size: any;
		public_description_html: string;
		allow_videos: boolean;
		is_crosspostable_subreddit: boolean;
		notification_level: any;
		can_assign_link_flair: boolean;
		accounts_active_is_fuzzed: boolean;
		allow_prediction_contributors: boolean;
		submit_text_label: any;
		link_flair_position: string;
		user_sr_flair_enabled: any;
		user_flair_enabled_in_sr: boolean;
		allow_chat_post_creation: boolean;
		allow_discovery: boolean;
		accept_followers: boolean;
		user_sr_theme_enabled: boolean;
		link_flair_enabled: boolean;
		subreddit_type: string;
		suggested_comment_sort: any;
		banner_img: string;
		user_flair_text: any;
		banner_background_color: string;
		show_media: boolean;
		id: string;
		user_is_moderator: any;
		over18: boolean;
		description: string;
		is_chat_post_feature_enabled: boolean;
		submit_link_label: any;
		user_flair_text_color: any;
		restrict_commenting: boolean;
		user_flair_css_class: any;
		allow_images: boolean;
		lang: string;
		whitelist_status: string;
		url: string;
		created_utc: number;
		banner_size: any;
		mobile_banner_image: string;
		user_is_contributor: any;
		allow_predictions_tournament: boolean;
	};
}

export interface Listing<T> {
	kind: 'Listing';
	data: {
		after: string;
		dist: number;
		modhash: string;
		geo_filter: any;
		children: T[];
	};
}

export interface Post {
	kind: string;
	data: {
		media_metadata?: Record<string, Media_Metadata>;
		approved_at_utc: any;
		subreddit: string;
		selftext: string;
		author_fullname: string;
		saved: boolean;
		mod_reason_title: any;
		gilded: number;
		clicked: boolean;
		title: string;
		link_flair_richtext: Record<string, string>[];
		subreddit_name_prefixed: string;
		hidden: boolean;
		pwls: number;
		link_flair_css_class: any;
		downs: number;
		thumbnail_height: number;
		top_awarded_type: any;
		hide_score: boolean;
		name: string;
		quarantine: boolean;
		link_flair_text_color: string;
		upvote_ratio: number;
		author_flair_background_color: any;
		subreddit_type: string;
		ups: number;
		total_awards_received: number;
		media_embed: Media_Embed;
		thumbnail_width: number;
		author_flair_template_id: any;
		is_original_content: boolean;
		user_reports: any[];
		secure_media: any;
		is_reddit_media_domain: boolean;
		is_meta: boolean;
		category: any;
		secure_media_embed: Media_Embed;
		link_flair_text: any;
		can_mod_post: boolean;
		score: number;
		approved_by: any;
		is_created_from_ads_ui: boolean;
		author_premium: boolean;
		thumbnail: string;
		edited: boolean;
		author_flair_css_class: any;
		author_flair_richtext: Record<string, string>[];
		gildings: any;
		post_hint: string;
		content_categories: any;
		is_self: boolean;
		mod_note: any;
		created: number;
		link_flair_type: string;
		wls: number;
		removed_by_category: any;
		banned_by: any;
		author_flair_type: string;
		domain: string;
		allow_live_comments: boolean;
		selftext_html: any;
		likes: any;
		suggested_sort: any;
		banned_at_utc: any;
		url_overridden_by_dest: string;
		view_count: any;
		archived: boolean;
		no_follow: boolean;
		is_crosspostable: boolean;
		pinned: boolean;
		over_18: boolean;
		preview: Preview;
		all_awardings: Award[];
		awarders: any[];
		media_only: boolean;
		can_gild: boolean;
		spoiler: boolean;
		locked: boolean;
		author_flair_text: any;
		treatment_tags: any[];
		visited: boolean;
		removed_by: any;
		num_reports: any;
		distinguished: any;
		subreddit_id: string;
		author_is_blocked: boolean;
		mod_reason_by: any;
		removal_reason: any;
		link_flair_background_color: string;
		id: string;
		is_robot_indexable: boolean;
		report_reasons: any;
		author: string;
		discussion_type: any;
		num_comments: number;
		send_replies: boolean;
		whitelist_status: string;
		contest_mode: boolean;
		mod_reports: any[];
		author_patreon_flair: boolean;
		author_flair_text_color: any;
		permalink: string;
		parent_whitelist_status: string;
		stickied: boolean;
		url: string;
		subreddit_subscribers: number;
		created_utc: number;
		num_crossposts: number;
		media: Reddit_Video;
		is_video: boolean;
	};
}

export interface Oembed {
	type: string;
	oembed: {
		provider_url: string;
		version: string;
		title: string;
		type: string;
		thumbnail_width: number;
		height: number;
		width: number;
		html: string;
		author_name: string;
		provider_name: string;
		thumbnail_url: string;
		thumbnail_height: number;
		author_url: string;
	};
}

export interface Reddit_Video {
	reddit_video?: {
		bitrate_kbps: number;
		dash_url: string;
		duration: number;
		fallback_url: string;
		height: number;
		hls_url: string;
		is_gif: boolean;
		scrubber_media_url: string;
		transcoding_status: string;
		width: number;
	};
}

export interface Preview {
	images: Image[];
	enabled: boolean;
}

export interface Image {
	source: Image_Source;
	resolutions: Image_Source[];
	variants: any;
	id: string;
}

export interface Image_Source {
	url: string;
	width: number;
	height: number;
}

export interface Award {
	giver_coin_reward: any;
	subreddit_id: any;
	is_new: boolean;
	days_of_drip_extension: any;
	coin_price: number;
	id: string;
	penny_donate: any;
	award_sub_type: string;
	coin_reward: number;
	icon_url: string;
	days_of_premium: any;
	tiers_by_required_awardings: any;
	resized_icons: Image_Source[];
	icon_width: number;
	static_icon_width: number;
	start_date: any;
	is_enabled: boolean;
	awardings_required_to_grant_benefits: any;
	description: string;
	end_date: any;
	subreddit_coin_reward: number;
	count: number;
	static_icon_height: number;
	name: string;
	resized_static_icons: Image_Source[];
	icon_format: any;
	icon_height: number;
	penny_price: any;
	award_type: string;
	static_icon_url: string;
}

export interface Media_Embed {
	content: string;
	width: number;
	scrolling: boolean;
	media_domain_url: string;
	height: number;
}

export interface Comment {
	kind: string;
	data: {
		children?: string[];
		subreddit_id: string;
		approved_at_utc: any;
		author_is_blocked: boolean;
		comment_type: any;
		awarders: any[];
		mod_reason_by: any;
		banned_by: any;
		author_flair_type: string;
		total_awards_received: number;
		subreddit: string;
		author_flair_template_id: any;
		likes: any;
		// if replies is empty, replies = ""
		replies?: Listing<Comment>;
		user_reports: any[];
		saved: boolean;
		id: string;
		banned_at_utc: any;
		mod_reason_title: any;
		gilded: number;
		archived: boolean;
		collapsed_reason_code: any;
		no_follow: boolean;
		author: string;
		can_mod_post: boolean;
		created_utc: number;
		send_replies: boolean;
		parent_id: string;
		score: number;
		author_fullname: string;
		approved_by: any;
		mod_note: any;
		all_awardings: Award[];
		collapsed: boolean;
		body: string;
		edited: boolean;
		top_awarded_type: any;
		author_flair_css_class: any;
		name: string;
		is_submitter: boolean;
		downs: number;
		author_flair_richtext: Record<string, string>[];
		author_patreon_flair: boolean;
		body_html: string;
		removal_reason: any;
		collapsed_reason: any;
		distinguished: any;
		associated_award: any;
		stickied: boolean;
		author_premium: boolean;
		can_gild: boolean;
		gildings: any;
		unrepliable_reason: any;
		author_flair_text_color: any;
		score_hidden: boolean;
		permalink: string;
		subreddit_type: string;
		locked: boolean;
		report_reasons: any;
		created: number;
		author_flair_text: any;
		treatment_tags: any[];
		link_id: string;
		subreddit_name_prefixed: string;
		controversiality: number;
		depth: number;
		author_flair_background_color: any;
		collapsed_because_crowd_control: any;
		mod_reports: any[];
		num_reports: any;
		ups: number;
	};
}

export interface Listing_List {
	post: Listing<Post>;
	comment: Listing<Comment>;
}

export interface Media_Metadata {
	e: string;
	id: string;
	m: string;
	p: Metadata_Image[];
	s: Metadata_Image;
	status: string;
}

interface Metadata_Image {
	x: number;
	y: number;
	u: string;
}

export interface Subreddit_Rules {
	rules: Rule[];
}

interface Rule {
	kind: 'comment' | 'link' | 'all';
	description: string;
	short_name: string;
	violation_reason: string;
	created_utc: number;
	priority: number;
	description_html?: string;
}

export interface Comment_Branch {
	kind: string;
	data: {
		parent: string;
		content: string;
		contentText: string;
		link: string;
		replies?: string[];
		contentHTML: string;
		id: string;
	};
}

export interface Comment_Tree {
	things: Comment_Branch[];
}

export interface Comment_Tree_Result {
	json: {
		errors: string;
		data: Comment_Tree;
	};
}

export interface User {
	kind: 't5';
	data: {
		is_employee: boolean;
		is_friend: boolean;
		subreddit: {
			default_set: boolean;
			user_is_contributor: any;
			banner_img: string;
			restrict_posting: boolean;
			user_is_banned: string;
			free_form_reports: boolean;
			community_icon: string;
			show_media: boolean;
			icon_color: string;
			user_is_muted: string;
			display_name: string;
			header_img: any;
			title: string;
			previous_names: any[];
			over_18: boolean;
			icon_size: [number, number];
			primary_color: string;
			icon_img: string;
			description: string;
			submit_link_label: string;
			header_size: any;
			restrict_commenting: boolean;
			subscribers: number;
			submit_text_label: string;
			is_default_icon: boolean;
			link_flair_position: string;
			display_name_prefixed: string;
			key_color: string;
			name: string;
			is_default_banner: boolean;
			url: string;
			quarantine: boolean;
			banner_size: any;
			user_is_moderator: any;
			accept_followers: boolean;
			public_description: string;
			link_flair_enabled: boolean;
			disable_contributor_requests: boolean;
			subreddit_type: 'user';
			user_is_subscriber: any;
		};
		snoovatar_size: any;
		awardee_karma: number;
		id: string;
		verified: boolean;
		is_gold: boolean;
		is_mod: boolean;
		awarder_karma: number;
		has_verified_email: boolean;
		icon_img: string;
		hide_from_robots: boolean;
		link_karma: number;
		is_blocked: false;
		total_karma: number;
		pref_show_snoovatar: boolean;
		name: string;
		created: number;
		created_utc: number;
		snoovatar_img: any;
		comment_karma: number;
		accept_followers: boolean;
		has_subscribed: boolean;
	};
}
