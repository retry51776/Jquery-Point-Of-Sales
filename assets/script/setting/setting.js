;$(function(){
	$.fn.POSsetting = function() {
	    //Here init setting plugin

	    //Default Menu setting
		var setting = {
			"info" : {
				"name" 		: "Lucky Dragon",
				"address" 	: "705 E Sam Rayburn Dr",
				"state" 	: "Texas",
				"zip" 		: "75418",
				"phone" 	: "(903) 583-2146",
				"fax" 		: "No fax yet",
				"tax"		: 8.25,
				"dfMenuID"	: "m0"
			},//end info
			"items" : [
				{
					"id" 		: "m0",
					"type" 		: "category",
					"content" 	: [ "buffet", "lunch", "friedrice", "beef", "chicken", "pork", "seafood", "house", "combination", "lomein", "appetizer", "side", "soup", "vegetables", "stream", "chowmein", "extra" ],
					"name"		: "Main Menu"
				},
				{
					"id" 		: "extra",
					"type" 		: "extra",
					"content" 	: 
						{ 
							"name" 	: "加费" , 
							"eng" 	: "Extra fee", 
							"price" : 0,
							"desc"	: "Adjust Price, then put fee description in item note"
						}
				},
				/************buffet***************/
					{
						"id" 		: "buffet",
						"type" 		: "category",
						"content" 	: [ "bt1", "bt2", "bt3","bt4", "bt5", "bt6", "bt7", "bt8", "bt9","bt10" ],
						"name"		: "Buffet"
					},
					{
						"id" 		: "bt1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "饮料" , 
								"eng" 	: "Drink", 
								"price" : 1.59
							}
					},
					{
						"id" 		: "bt2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "午餐" , 
								"eng" 	: "Lunch", 
								"price" : 5.99
							}
					},
					{
						"id" 		: "bt3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "晚餐" , 
								"eng" 	: "Dinner", 
								"price" : 7.59
							}
					},
					{
						"id" 		: "bt4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "星期天全日" , 
								"eng" 	: "Sunday All Day", 
								"price" : 7.29
							}
					},
					{
						"id" 		: "bt5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "外卖-午" , 
								"eng" 	: "Lunch Carry Out", 
								"price" : 6.99
							}
					},
					{
						"id" 		: "bt6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "外卖-晚" , 
								"eng" 	: "Dinner Carry Out", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bt7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小孩(3-6) 午餐" , 
								"eng" 	: "Kid (3-6) Lunch", 
								"price" : 2.99
							}
					},
					{
						"id" 		: "bt8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小孩(3-6) 晚餐" , 
								"eng" 	: "Kid (3-6) Dinner", 
								"price" : 3.59
							}
					},
					{
						"id" 		: "bt9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小孩(7-10) 午餐" , 
								"eng" 	: "Kid (7-10) Lunch", 
								"price" : 3.59
							}
					},
					{
						"id" 		: "bt10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小孩(7-10) 晚餐" , 
								"eng" 	: "Kid (7-10) Dinner", 
								"price" : 3.99
							}
					},
				/***************End of buffet**************/


				/************Lunch***************/
					{
						"id" 		: "lunch",
						"type" 		: "category",
						"content" 	: [ "ln1", "ln2", "ln3","ln4", "ln5", "ln6", "ln7", "ln8", "ln9","ln10", "ln11", "ln2", "ln13", "ln14", "ln15"   ],
						"name"		: "Lunch Speical"
					},
					{
						"id" 		: "ln1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡，肉，虾炒面" , 
								"eng" 	: "Any Chow Mein", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "青椒牛" , 
								"eng" 	: "Peper Streak", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰鸡" , 
								"eng" 	: "Chicken Broccoli", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "烤排骨" , 
								"eng" 	: "BQ Rib", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "宫保鸡" , 
								"eng" 	: "Kung Pao Chicken", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香鸡，虾" , 
								"eng" 	: "[Chicken, Shrimp] Garlic Sauce", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "湖南鸡，牛，猪" , 
								"eng" 	: "Hunan [Beef, Pork, Chicken]", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "左宗鸡" , 
								"eng" 	: "General Tso Chicken", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "素什菜" , 
								"eng" 	: "Mixed Vegetable", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰牛" , 
								"eng" 	: "Beef Broccoli", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芝麻鸡" , 
								"eng" 	: "Sesamemixed Vegetable Chicken", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln12",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸猪，鸡" , 
								"eng" 	: "Sweet & Sour [Pork, Chicken]", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln13",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜虾，肉，鸡" , 
								"eng" 	: "[Beef, Chicken, Shrimp] Mixed Vegetable", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "ln14",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "辣椒鸡" , 
								"eng" 	: "Jalapeno Chicken", 
								"price" : 5.25
							}
					},
					{
						"id" 		: "l15",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "菜捞面" , 
								"eng" 	: "Vegatable Lobster Sauce", 
								"price" : 5.25
							}
					},
				/***************End of Lunch**************/

				/***************appetizer**************/
					{
						"id" 		: "appetizer",
						"type" 		: "category",
						"content" 	: [ "az1", "az2", "az3", "az4", "az5", "az6", "az7", "az8", "az9", "az10", "az11"],
						"name"		: "Appetizer"
					},
					{
						"id" 		: "az1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸面包" , 
								"eng" 	: "Sweet Donut (10)", 
								"price" : 3
							}
					},
					{
						"id" 		: "az2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "春卷" , 
								"eng" 	: "Chicken Egg Roll", 
								"price" : 1
							}
					},
					{
						"id" 		: "az3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "素春卷" , 
								"eng" 	: "Vegetable Egg Roll", 
								"price" : 1
							}
					},
					{
						"id" 		: "az4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸云吞" , 
								"eng" 	: "Fried Wonton (10)", 
								"price" : 3.75
							}
					},
					{
						"id" 		: "az5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "锅贴" , 
								"eng" 	: "Fried Dumpling", 
								"price" : 4.25
							}
					},
					{
						"id" 		: "az6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡串" , 
								"eng" 	: "Teriyaki Chicken (4)", 
								"price" : 3.95
							}
					},
					{
						"id" 		: "az7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸蟹角" , 
								"eng" 	: "Crab Rangoon (8)", 
								"price" : 3.99
							}
					},
					{
						"id" 		: "az8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸鸡翼" , 
								"eng" 	: "Fried Chieck Wings (4)", 
								"price" : 3.5
							}
					},
					{
						"id" 		: "az9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小炸排骨" , 
								"eng" 	: "BBQ Rib (Small)", 
								"price" : 5.5
							}
					},
					{
						"id" 		: "az10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大炸排骨" , 
								"eng" 	: "BBQ Rib (Big)", 
								"price" : 9.75
							}
					},
					{
						"id" 		: "az11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "宝宝盘" , 
								"eng" 	: "Pu Pu Platter", 
								"price" : 8.5
							}
					},
				/***************End of appetizer**************/

				/***************soup**************/
					{
						"id" 		: "soup",
						"type" 		: "category",
						"content" 	: [ "su1", "su2", "su3", "su4", "su5", "su6", "su7", "su8", "su9", "su10"],
						"name"		: "Soup"
					},
					{
						"id" 		: "su1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小蛋花汤" , 
								"eng" 	: "Egg Drop (small)", 
								"price" : 1.69
							}
					},
					{
						"id" 		: "su2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大蛋花汤" , 
								"eng" 	: "Egg Drop (big)", 
								"price" : 2.89
							}
					},
					{
						"id" 		: "su3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小云吞汤" , 
								"eng" 	: "Wonton (small)",
								"price" : 1.69
							}
					},
					{
						"id" 		: "su4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大云吞汤" , 
								"eng" 	: "Wonton (big)", 
								"price" : 2.89
							}
					},
					{
						"id" 		: "su5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小酸辣汤" , 
								"eng" 	: "Hot & Sour (small)", 
								"price" : 2.09
							}
					},
					{
						"id" 		: "su6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大酸辣汤" , 
								"eng" 	: "Hot & Sour (big)", 
								"price" : 3.69
							}
					},
					{
						"id" 		: "su7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡饭汤" , 
								"eng" 	: "Chicken Rice", 
								"price" : 4.69
							}
					},
					{
						"id" 		: "su8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "小蔬菜汤" , 
								"eng" 	: "Vegetable (small)", 
								"price" : 2.09
							}
					},
					{
						"id" 		: "su9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大蔬菜汤" , 
								"eng" 	: "Vegetable (big)", 
								"price" : 3.69
							}
					},
					{
						"id" 		: "su10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "本楼汤" , 
								"eng" 	: "House Special", 
								"price" : 4.69
							}
					},
				/***************End of soup**************/

				/***************friedrice**************/
					{
						"id" 		: "friedrice",
						"type" 		: "category",
						"content" 	: [ "fr1", "fr2", "fr3", "fr4", "fr5", "fr6", "fr7", "fr8", "fr9", "fr10"],
						"name"		: "Friedrice"
					},
					{
						"id" 		: "fr1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "本楼炒饭" , 
								"eng" 	: "House", 
								"price" : 6.55
							}
					},
					{
						"id" 		: "fr2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "虾炒饭" , 
								"eng" 	: "Shrimp", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "fr3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "牛炒饭" , 
								"eng" 	: "Beef",
								"price" : 6.25
							}
					},
					{
						"id" 		: "fr4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡炒饭" , 
								"eng" 	: "Chicken", 
								"price" : 5.75
							}
					},
					{
						"id" 		: "fr5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "猪炒饭" , 
								"eng" 	: "Pork", 
								"price" : 5.75
							}
					},
					{
						"id" 		: "fr6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "菜炒饭" , 
								"eng" 	: "Vegetable", 
								"price" : 5
							}
					},
				/***************End of friedrice**************/

				/***************End of lo mein**************/
					{
						"id" 		: "lomein",
						"type" 		: "category",
						"content" 	: [ "lm1", "lm2", "lm3", "lm4", "lm5", "lm6", "lm7", "lm8", "lm9", "lm10"],
						"name"		: "Lo Mein"
					},
					{
						"id" 		: "lm1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "本楼捞面" , 
								"eng" 	: "House", 
								"price" : 6.75
							}
					},
					{
						"id" 		: "lm2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "虾捞面" , 
								"eng" 	: "Shrimp", 
								"price" : 6.75
							}
					},
					{
						"id" 		: "lm3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "牛捞面" , 
								"eng" 	: "Beef",
								"price" : 6.75
							}
					},
					{
						"id" 		: "lm4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡捞面" , 
								"eng" 	: "Chicken", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "lm5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "猪捞面" , 
								"eng" 	: "Pork", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "lm6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "菜捞面" , 
								"eng" 	: "Pork", 
								"price" : 6.25
							}
					},
				/***************End of lo mein**************/

				/***************vegetables**************/
					{
						"id" 		: "vegetables",
						"type" 		: "category",
						"content" 	: [ "vg1", "vg2", "vg3", "vg4"],
						"name"		: "Vegetables"
					},
					{
						"id" 		: "vg1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炒素什锦" , 
								"eng" 	: "Happy Vegetarian", 
								"price" : 5.99
							}
					},
					{
						"id" 		: "vg2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炒湖南什菜" , 
								"eng" 	: "Hunan Mix Vegetables", 
								"price" : 5.99
							}
					},
					{
						"id" 		: "vg3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炒四季豆" , 
								"eng" 	: "Sauteed Green Bean",
								"price" : 5.99
							}
					},
					{
						"id" 		: "vg4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炒蘑菇" , 
								"eng" 	: "Sauteed Mushroom", 
								"price" : 5.99
							}
					},
				/***************End of vegetables**************/

				/***************stream**************/
					{
						"id" 		: "stream",
						"type" 		: "category",
						"content" 	: [ "sm1", "sm2", "sm3", "sm4", "sm5" ],
						"name"		: "Stream"
					},
					{
						"id" 		: "sm1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒸素什锦" , 
								"eng" 	: "Streamed Mixed Vegetables", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "sm2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒸什菜鸡" , 
								"eng" 	: "Streamed Chicken Vegetabless", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "sm3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒸芥兰鸡" , 
								"eng" 	: "Streamed Chicken Broccoli", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "sm4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒸芥兰虾" , 
								"eng" 	: "Streamed Shrimp Broccoli", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "sm5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒸什菜虾" , 
								"eng" 	: "Streamed Shrimp Vegetables", 
								"price" : 8.59
							}
					},
				/***************End of stream**************/

				/***************chowmein**************/
					{
						"id" 		: "chowmein",
						"type" 		: "category",
						"content" 	: [ "cm1", "cm2", "cm3", "cm4", "cm5", "cm6" ],
						"name"		: "Chow Mein"
					},
					{
						"id" 		: "cm1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "本楼炒面" , 
								"eng" 	: "House", 
								"price" : 6.75
							}
					},
					{
						"id" 		: "cm2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "虾炒面" , 
								"eng" 	: "Shrimp", 
								"price" : 6.75
							}
					},
					{
						"id" 		: "cm3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "牛炒面" , 
								"eng" 	: "Beef",
								"price" : 6.75
							}
					},
					{
						"id" 		: "cm4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡炒面" , 
								"eng" 	: "Chicken", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "cm5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "猪炒面" , 
								"eng" 	: "Pork", 
								"price" : 6.25
							}
					},
					{
						"id" 		: "cm6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "菜炒面" , 
								"eng" 	: "Pork", 
								"price" : 6.25
							}
					},
				/***************End of chowmein**************/

				/***************pork**************/
					{
						"id" 		: "pork",
						"type" 		: "category",
						"content" 	: [ "pk1", "pk2", "pk3", "pk4", "pk5", "pk6" ],
						"name"		: "Pork"
					},
					{
						"id" 		: "pk1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸肉" , 
								"eng" 	: "Sweet & Sour Pork", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "pk2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蔬菜肉" , 
								"eng" 	: "Vegetable Pork", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "pk3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "四川肉" , 
								"eng" 	: "Szechuan Pork",
								"price" : 7.15
							}
					},
					{
						"id" 		: "pk4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "湖南肉" , 
								"eng" 	: "Hunan Pork", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "pk5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蘑菇肉" , 
								"eng" 	: "Pork Mushroom", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "pk6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "会呙肉" , 
								"eng" 	: "Double Sauteed Pork", 
								"price" : 7.15
							}
					},
				/***************End of pork**************/

				/***************chicken**************/
					{
						"id" 		: "chicken",
						"type" 		: "category",
						"content" 	: [ "ck1", "ck2", "ck3","ck4", "ck5", "ck6", "ck7", "ck8", "ck9","ck10", "ck11" , "ck12" ],
						"name"		: "Chicken"
					},
					{
						"id" 		: "ck1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸鸡" , 
								"eng" 	: "Sweet & Sour Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "加哩鸡" , 
								"eng" 	: "Curry Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蘑菇鸡" , 
								"eng" 	: "Moo Goo Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰鸡" , 
								"eng" 	: "Chicken Broccoli", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "木须鸡" , 
								"eng" 	: "Moo Shu Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "腰果鸡" , 
								"eng" 	: "Cashew Nut Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香鸡" , 
								"eng" 	: "Chicken with Garlic Sauce", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "湖南鸡" , 
								"eng" 	: "Hunan Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "四川鸡" , 
								"eng" 	: "Szechuan Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "宫保鸡" , 
								"eng" 	: "Kung Po Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜鸡" , 
								"eng" 	: "Vegetable Chicken", 
								"price" : 7.15
							}
					},
					{
						"id" 		: "ck12",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "杏仁鸡" , 
								"eng" 	: "Almond Chicken", 
								"price" : 7.15
							}
					},
				/***************End of chicken**************/

				/***************beef**************/
					{
						"id" 		: "beef",
						"type" 		: "category",
						"content" 	: [ "bf1", "bf2", "bf3","bf4", "bf5", "bf6", "bf7", "bf8", "bf9" ],
						"name"		: "Beef"
					},
					{
						"id" 		: "bf1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "青椒牛" , 
								"eng" 	: "Pepper Steak", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜牛" , 
								"eng" 	: "Beef with Mixed Vegetables", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰牛" , 
								"eng" 	: "Beef with Broccoli", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "双冬牛" , 
								"eng" 	: "Beef Mushroom Bamboo", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "加哩牛" , 
								"eng" 	: "Curry Beef", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "西川牛" , 
								"eng" 	: "Szechuan Beef", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "湖南牛" , 
								"eng" 	: "Hunan Beef", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香牛" , 
								"eng" 	: "Garlic Beef", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "bf9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "干烧牛" , 
								"eng" 	: "Hot & Spicy Beef", 
								"price" : 7.99
							}
					},
				/***************End of beef**************/

				/***************seafood**************/
					{
						"id" 		: "seafood",
						"type" 		: "category",
						"content" 	: [ "se1", "se2", "se3", "se4", "se5", "se6", "se7", "se8", "se9", "se10", "se11"],
						"name"		: "Seafood"
					},
					{
						"id" 		: "se1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜虾" , 
								"eng" 	: "Shrimp Mixed Vegetables", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "虾龙湖" , 
								"eng" 	: "Shrimp Lobster Sauce", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰虾" , 
								"eng" 	: "Shrimp with Broccoli", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "木须虾" , 
								"eng" 	: "Moo Shu Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "腰果虾" , 
								"eng" 	: "Cashew Nut Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸虾" , 
								"eng" 	: "Sweet & Sour Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "牛油虾" , 
								"eng" 	: "Butter Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "四川虾" , 
								"eng" 	: "Szechuan Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香虾" , 
								"eng" 	: "Shrimp with Garlic Sauce", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "干烧虾" , 
								"eng" 	: "Hot & Spicy Shrimp", 
								"price" : 8.59
							}
					},
					{
						"id" 		: "se11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸大虾" , 
								"eng" 	: "Fried Jumbo Shrimp", 
								"price" : 8.59
							}
					},
				/***************End of appetizer**************/

				/***************side**************/
					{
						"id" 		: "side",
						"type" 		: "category",
						"content" 	: [ "sd1", "sd2", "sd3", "sd4", "sd5" ],
						"name"		: "Side"
					},
					{
						"id" 		: "sd1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "杏仁饼" , 
								"eng" 	: "Almond Cookies (10)", 
								"price" : 2.5
							}
					},
					{
						"id" 		: "sd2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炸面干" , 
								"eng" 	: "Fried Noodles", 
								"price" : 1
							}
					},
					{
						"id" 		: "sd3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "White Rice" , 
								"eng" 	: "白饭", 
								"price" : 2
							}
					},
					{
						"id" 		: "sd4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "炒饭" , 
								"eng" 	: "Fried Rice", 
								"price" : 3
							}
					},
					{
						"id" 		: "sd5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "水果" , 
								"eng" 	: "Fruits", 
								"price" : 2
							}
					},
				/***************End of stream**************/

				/************house***************/
					{
						"id" 		: "house",
						"type" 		: "category",
						"content" 	: [ "hs1", "hs2", "hs3","hs4", "hs5", "hs6", "hs7", "hs8", "hs9","hs10", "hs11", "hs2", "hs13", "hs14", "hs15"   ],
						"name"		: "House Speical"
					},
					{
						"id" 		: "hs1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "海鲜大会" , 
								"eng" 	: "Seafood Delight", 
								"price" : 9.75
							}
					},
					{
						"id" 		: "hs2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "四喜" , 
								"eng" 	: "Four Season", 
								"price" : 8.5
							}
					},
					{
						"id" 		: "hs3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蒙古牛" , 
								"eng" 	: "Mongolian Beef", 
								"price" : 8.5
							}
					},
					{
						"id" 		: "hs4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "陈皮牛" , 
								"eng" 	: "Orange Beef", 
								"price" : 8.5
							}
					},
					{
						"id" 		: "hs5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "左宗鸡" , 
								"eng" 	: "General Tso Chicken", 
								"price" : 7.75
							}
					},
					{
						"id" 		: "hs6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "陈皮鸡" , 
								"eng" 	: "Orange Chicken", 
								"price" : 8.5
							}
					},
					{
						"id" 		: "hs7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "大三元" , 
								"eng" 	: "Mandarin Triple Crown", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "hs8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芝麻鸡" , 
								"eng" 	: "Sesame Chicken", 
								"price" : 7.75
							}
					},
					{
						"id" 		: "hs9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香二样" , 
								"eng" 	: "Double Delight Garlic Sauce", 
								"price" : 9.29
							}
					},
					{
						"id" 		: "hs10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "辣子三样" , 
								"eng" 	: "Triple Delight Szechuan Style", 
								"price" : 7.95
							}
					},
					{
						"id" 		: "hs11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "辣椒虾" , 
								"eng" 	: "Jalapeno Shrimp", 
								"price" : 10.29
							}
					},
					{
						"id" 		: "hs12",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸什锦" , 
								"eng" 	: "Sweet & Sour Delight", 
								"price" : 7.99
							}
					},
					{
						"id" 		: "hs13",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "龙凤配" , 
								"eng" 	: "Dragon Phoenix", 
								"price" : 9.99
							}
					},
					{
						"id" 		: "hs14",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "辣椒鸡" , 
								"eng" 	: "Jalapeno Chicken", 
								"price" : 8.29
							}
					},
				/***************End of house**************/

				/************combination***************/
					{
						"id" 		: "combination",
						"type" 		: "category",
						"content" 	: [ "cp1", "cp2", "cp3","cp4", "cp5", "cp6", "cp7", "cp8", "cp9","cp10", "cp11", "cp2", "cp13", "cp14", "cp15", "cp16", "cp17", "cp18", "cp19", "cp20" ],
						"name"		: "Combination Plate"
					},
					{
						"id" 		: "cp1",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡，肉，虾炒面" , 
								"eng" 	: "Any Chow Mein", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp3",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "青椒牛" , 
								"eng" 	: "Peper Streak", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp6",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰鸡" , 
								"eng" 	: "Chicken Broccoli", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp10",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "烤排骨" , 
								"eng" 	: "BQ Rib", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp14",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "宫保鸡" , 
								"eng" 	: "Kung Pao Chicken", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp17",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鱼香鸡，虾" , 
								"eng" 	: "[Chicken, Shrimp] Garlic Sauce", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp15",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "湖南鸡" , 
								"eng" 	: "Hunan Chicken", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp19",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "左宗鸡" , 
								"eng" 	: "General Tso Chicken", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp9",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜猪" , 
								"eng" 	: "Mixed Vegetable", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp13",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芥兰牛" , 
								"eng" 	: "Beef Broccoli", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp20",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "芝麻鸡" , 
								"eng" 	: "Sesamemixed Vegetable Chicken", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp7",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "甜酸猪" , 
								"eng" 	: "Sweet & Sour Pork", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp11",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜牛" , 
								"eng" 	: "Beef with Mixed Vegetable", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp2",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "辣椒鸡" , 
								"eng" 	: "Jalapeno Chicken", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp4",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "猪芙蓉" , 
								"eng" 	: "Pork Egg Foo Young", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp5",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "龙虾糊" , 
								"eng" 	: "Shrimp with Lobster Sauce", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp8",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "蘑菇鸡片" , 
								"eng" 	: "Moo Goo Gai Pan", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp12",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "鸡串" , 
								"eng" 	: "Chicken Terriyaki", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp16",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "什菜鸡" , 
								"eng" 	: "Chicken with Mixed Vegetable", 
								"price" : 7.25
							}
					},
					{
						"id" 		: "cp18",
						"type" 		: "dish",
						"content" 	: 
							{ 
								"name" 	: "西川牛" , 
								"eng" 	: "Szechuan Beef", 
								"price" : 7.25
							}
					},
				/***************End of combination**************/

			],//end items
			"side"	: 	{
				"rice" 		: ["vg","sm","pk","ck","bf","se","hs","cp"],
				"lunch"		: ["ln"],
				"chip"		: ["su"]
			},
			'searchItem' 	: searchItem,
			'searchObject' 	: searchObject,
			'setTextByClass': setTextByClass
		};

		return setting;

	    function searchItem( id ){
			var result = null;
			$.each( setting.items , function() {
				if ( typeof this.id !== "undefined" && this.id == id ){
					result = this;
					return false;
				}
			});
			return result;
		};//End of searchItem()


		function searchObject( val ) {
			var strArray 	= $.trim( val ).toLowerCase().split(' ');
		    var objects 	= [];
		    for (var itemIndex in setting.items ) {
		    	var thisItem = JSON.stringify( setting.items[itemIndex] ).toLowerCase();
		    	$.each(strArray , function( arrayIndex, arrayVal) { 
					if( thisItem.indexOf( arrayVal ) != -1 ){
						if( arrayIndex == strArray.length-1){
							objects.push(setting.items[itemIndex]);
						}
			    	}else{
			    		return false;
			    	}
				});
		    	
		    }
		    return objects;
		}//end searchObject

		function setTextByClass( obj , element){
			for( var property in obj ){
				if( obj[property] != null ){
					element.find("."+property).text( obj[property] );
				}
			}
		}//end setTextByClass
	};
	console.log("setting loaded");
}( jQuery ));