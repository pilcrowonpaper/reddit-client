export interface User {
	is_employee: boolean;
	seen_layout_switch: boolean;
	has_visited_new_profile: boolean;
	pref_no_profanity: boolean;
	has_external_account: boolean;
	pref_geopopular: string;
	seen_redesign_modal: boolean;
	pref_show_trending: boolean;
	subreddit: {
		default_set: boolean;
		user_is_contributor: boolean;
		banner_img: string;
		restrict_posting: boolean;
		user_is_banned: boolean;
		free_form_reports: boolean;
		community_icon: null;
		show_media: boolean;
		icon_color: string;
		user_is_muted: boolean;
		display_name: string;
		header_img: string;
		title: string;
		coins: number;
		previous_names: string[];
		over_18: boolean;
		icon_size: [number, number];
		primary_color: string;
		icon_img: string;
		description: string;
		submit_link_label: string;
		header_size: null;
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
		banner_size: [number, number];
		user_is_moderator: boolean;
		accept_followers: boolean;
		public_description: string;
		link_flair_enabled: boolean;
		disable_contributor_requests: boolean;
		subreddit_type: string;
		user_is_subscriber: boolean;
	};
	pref_show_presence: boolean;
	snoovatar_img: string;
	snoovatar_size: number;
	gold_expiration: number;
	has_gold_subscription: boolean;
	is_sponsor: boolean;
	num_friends: number;
	features: {
		mod_service_mute_writes: boolean;
		promoted_trend_blanks: boolean;
		show_amp_link: boolean;
		chat: boolean;
		is_email_permission_required: boolean;
		mod_awards: boolean;
		mweb_xpromo_revamp_v3: { owner: string; variant: string; experiment_id: number };
		mweb_xpromo_revamp_v2: { owner: string; variant: string; experiment_id: number };
		awards_on_streams: boolean;
		webhook_config: boolean;
		mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean;
		live_orangereds: boolean;
		cookie_consent_banner: boolean;
		modlog_copyright_removal: boolean;
		do_not_track: boolean;
		mod_service_mute_reads: boolean;
		chat_user_settings: boolean;
		use_pref_account_deployment: boolean;
		mweb_xpromo_interstitial_comments_ios: boolean;
		chat_subreddit: boolean;
		noreferrer_to_noopener: boolean;
		premium_subscriptions_table: boolean;
		mweb_xpromo_interstitial_comments_android: boolean;
		crowd_control_for_post: boolean;
		chat_group_rollout: boolean;
		resized_styles_images: boolean;
		spez_modal: boolean;
		mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
		expensive_coins_package: boolean;
	};
	can_edit_name: boolean;
	verified: boolean;
	pref_autoplay: boolean;
	coins: number;
	has_paypal_subscription: boolean;
	has_subscribed_to_premium: boolean;
	id: string;
	has_stripe_subscription: boolean;
	oauth_client_id: string;
	can_create_subreddit: boolean;
	over_18: boolean;
	is_gold: boolean;
	is_mod: boolean;
	awarder_karma: number;
	suspension_expiration_utc: null;
	has_verified_email: boolean;
	is_suspended: boolean;
	pref_video_autoplay: boolean;
	has_android_subscription: boolean;
	in_redesign_beta: boolean;
	icon_img: string;
	pref_nightmode: boolean;
	awardee_karma: number;
	hide_from_robots: boolean;
	password_set: boolean;
	link_karma: number;
	force_password_reset: boolean;
	total_karma: number;
	seen_give_award_tooltip: boolean;
	inbox_count: number;
	seen_premium_adblock_modal: boolean;
	pref_top_karma_subreddits: boolean;
	pref_show_snoovatar: boolean;
	name: string;
	pref_clickgadget: number;
	created: number;
	gold_creddits: number;
	created_utc: string;
	has_ios_subscription: boolean;
	pref_show_twitter: boolean;
	in_beta: boolean;
	comment_karma: number;
	accept_followers: boolean;
	has_subscribed: boolean;
	linked_identities: [];
	seen_subreddit_chat_ftux: boolean;
}

export interface UserPrefs {
	beta: boolean;
	default_theme_sr: null;
	threaded_messages: boolean;
	email_comment_reply: boolean;
	private_feeds: boolean;
	activity_relevant_ads: boolean;
	email_messages: boolean;
	profile_opt_out: boolean;
	video_autoplay: boolean;
	email_private_message: boolean;
	geopopular: string;
	show_link_flair: boolean;
	show_trending: boolean;
	send_welcome_messages: boolean;
	country_code: string;
	design_beta: boolean;
	monitor_mentions: boolean;
	hide_downs: boolean;
	clickgadget: boolean;
	lang: string;
	ignore_suggested_sort: boolean;
	show_presence: boolean;
	email_upvote_comment: boolean;
	email_digests: boolean;
	layout: string;
	num_comments: number;
	feed_recommendations_enabled: boolean;
	label_nsfw: boolean;
	research: boolean;
	use_global_defaults: boolean;
	show_snoovatar: boolean;
	over_18: boolean;
	legacy_search: boolean;
	live_orangereds: boolean;
	highlight_controversial: boolean;
	no_profanity: boolean;
	domain_details: boolean;
	collapse_left_bar: boolean;
	email_community_discovery: boolean;
	bad_comment_autocollapse: 'on' | 'off';
	hide_ups: boolean;
	third_party_data_personalized_ads: boolean;
	email_chat_request: boolean;
	allow_clicktracking: boolean;
	hide_from_robots: boolean;
	show_twitter: boolean;
	compress: boolean;
	accept_pms: 'everyone';
	store_visits: boolean;
	threaded_modmail: boolean;
	email_upvote_post: boolean;
	min_link_score: number;
	media_preview: 'subreddit';
	email_user_new_follower: boolean;
	nightmode: boolean;
	enable_default_themes: boolean;
	third_party_site_data_personalized_content: boolean;
	third_party_site_data_personalized_ads: boolean;
	survey_last_seen_time: number;
	show_stylesheets: boolean;
	enable_followers: boolean;
	email_new_user_welcome: boolean;
	public_votes: boolean;
	email_post_reply: boolean;
	collapse_read_messages: boolean;
	show_flair: boolean;
	mark_messages_read: boolean;
	search_include_over_18: boolean;
	hide_ads: boolean;
	third_party_personalized_ads: boolean;
	email_username_mention: boolean;
	top_karma_subreddits: boolean;
	newwindow: boolean;
	numsites: number;
	min_comment_score: number;
	send_crosspost_messages: boolean;
	media: 'subreddit';
	public_server_seconds: boolean;
	show_gold_expiration: boolean;
	highlight_new_comments: boolean;
	email_unsubscribe_all: boolean;
	default_comment_sort: 'confidence';
	show_location_based_recommendations: boolean;
}