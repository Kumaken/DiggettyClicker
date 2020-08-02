interface IEventConfig {
  //General Config
  //images
  general_icon_terms: string;
  general_icon_life: string;
  general_icon_life_broken: string;
  general_icon_currency: string;
  general_icon_sound: string;
  general_image_button_rectangle_1: string;
  general_image_button_rectangle_2: string;
  general_icon_star: string;
  general_icon_plus: string;
  general_image_popup_title_plate: string;
  general_image_background: string;
  general_image_button_store: string;

  //color
  general_color_primary: string;
  general_color_secondary: string;
  general_color_tertiary: string;
  general_color_quaternary: string;
  general_color_popup_background_front: string;
  general_color_popup_background_back: string;
  general_color_reward_title_front: string;
  general_color_reward_title_back: string;

  //text
  general_text_game_title: string;
  general_text_prizes: string;

  //header
  genaral_text_full: string;
  general_text_level: string;
  general_text_store: string;
  general_text_token: string;
  general_text_full_token: String;

  //popup
  general_text_you_get_token_title: string;
  general_text_you_get_token_content: string;
  general_text_too_late_title: string;
  general_text_too_late_content: string;
  general_text_level_up: string;
  general_text_level_uo_content: string;
  general_text_help_successful_title: string;
  general_text_help_successful_content: string;

  //sounds
  general_sound_tap: string;
  general_sound_bgm: string;

  //Game Config
  //Images
  gameplay_icon_pause: string;
  gameplay_icon_timer: string;
  gameplay_icon_switch: string;

  //Sprites
  gameplay_sprite_bubble: string;
  gameplay_sprite_mascot_aim: string;
  gameplay_sprite_mascot_shooting_up: string;

  gameplay_sprite_mascot_shooting_right: string;
  //shooting left is mirrored through code

  gameplay_sprite_mascot_win: string;
  gameplay_sprite_mascot_lose: string;

  //text
  gameplay_text_goal_title: string;
  gameplay_text_goal_content: string;
  gameplay_text_game_paused: string;
  gameplay_text_game_over: string;
  gameplay_text_level_clear: string;
  gameplay_text_continue: string;
  gameplay_text_restart: string;
  gameplay_text_quit: string;
  gameplay_text_yes: string;
  gameplay_text_no: string;
  gameplay_text_next: string;
  gameplay_text_lets_go: string;
  gameplay_text_well_done: string;
  gameplay_text_total_score: string;

  //if admin builder can send data in array form?
  level_settings_move_prompt: string[];

  //sounds
  gameplay_sound_bgm: string;
  gameplay_sound_lets_go: string;
  gameplay_sound_bubble_release: string;
  gameplay_sound_bubble_collide: string;
  gameplay_sound_bubble_popping: string;
  gameplay_sound_bubble_switching: string;
  gameplay_sound_powerup_1: string;
  gameplay_sound_powerup_2: string;
  gameplay_sound_powerup_3: string;
  gameplay_sound_level_clear: string;
  gameplay_sound_game_over: string;

  //game settings
  game_settings_life_recovery_time: number;
  game_settings_max_life: number;
  game_settings_star_to_currency: number[];
}

// Better to keep separate from general config
// because this vary from player to player
interface ISaveConfig {
  //Gems
  save_config_current_currency: number;
  //Number of level that has been unlocked
  save_config_unlocked_levels: number;
  //last stars aqcuired for each level
  save_config_last_stars: number[];
  //life
  save_config_current_life: number[];

  save_config_last_score: number[];
}

//get data from level editor
interface IGameplayConfig {
  //preferrably in hex format instead of rgba
  game_settings_bubble_color_preset: string[];
  //total number of level
  game_settings_level_count: number;
  //Array of ILevelConfig
  game_settings_levels: ILevelConfig[];
}

enum E_LEVEL_TYPE {
  //falling ceiling
  REGULAR = 0,
  //static ceiling
  STATIC = 1,
  //endless with random bubbles
  ENDLESS = 2
}

interface IPowerUp {
  score_multiplier: number;
  trajectory_guide: number;
  extra_time: number;
}

interface IRow {
  //array of color preset index
  row: number[];
}

interface ILevelConfig {
  level_settings_time_limit: number;

  level_settings_level_type: number;
  level_settings_descend_delay: number;
  level_settings_points_to_star: number[];

  level_settings_move_prompt_threshold: number[];
  //IPowerUp
  // ex. {score_multiplier: 1, trajectory_guide: 0, extra_time: 1}
  level_settings_available_powerup: IPowerUp;

  level_settings_map: IRow[];
}
