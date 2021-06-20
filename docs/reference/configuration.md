


??? info "Branding"

    ``` lua
        ['Branding'] = {
		    ['Name'] = "Group Name",
		    ['ImageId'] = "rbxassetid://0000000000",
	    }
    ```

    **['Name']** Enter your groups name inside the speech marks

    **['ImageId']** Enter a roblox decal id, ensure it has the `rbxassetid://`, and the image is **SQUARE** shaped.

??? info "Cashier Settings"

    ``` lua
    ['CashierSettings'] = {
		['GroupID'] = 0000000;
		['MinimumRankEnabled'] = true/false;
		['MinimumRank'] = 0;
		['RankTable'] = {};
		['OrderCooldown'] = 0; 
		['CustomerPrompt'] = true/false; 
	};
    ```

    **['GroupID']** Enter your groups ID where cashiers will be
    
    **['MinimumRankEnabled']** When true, a minimum rank can be set, all ranks above will be able to use the cashier screen. Use false if you want to set up a rank table.

    **['MinimumRank']** Only works if the above value is true. All ranks above this number will be allowed to use the cashier screen.

    **['RankTable']** Will only work if MinimumRankEnabled is false. Only the ranks that are set here are whitelisted for the cashier screen. For example: `['RankTable'] = {5,10,11,12,255};` Ranks 5, 10-12 and 255 can use the machine.

    **['OrderCooldown']** Cooldown for cashiers making orders, in seconds. 
    
    ??? tip "OrderCooldown Tip"
        Don't set this too high or team members won't be able to create orders often.

    **['CustomerPrompt']** When true, the customer confirms the order is correct to send off to the chef's board. When false, the order does not get checked.

??? info "Order Board/Chef's Board Settings" 

    ``` lua
    ['OrderBoardSettings'] = {
		['MinimumRankEnabled'] = true/false;
		['MinimumRank'] = 0;
		['RankTable'] = {};
	};
    ```

    **['MinimumRankEnabled]** When true, a minimum rank can be set, all ranks above will be able to use the order board. Use false if you want to set up a rank table.

    **['MinimumRank']** Only works if the above value is true. All ranks above this number will be allowed to use the order board.

    **['RankTable']** Will only work if MinimumRankEnabled is false. Only the ranks that are set here are whitelisted for the order board. For example: `['RankTable'] = {5,10,11,12,255};` Ranks 5, 10-12 and 255 can use the board.

??? info "Point Settings"
    Everytime some one makes an order on the cashiers screen or completes an order using the order board, they gain the amount of points set in the PointsAwarded setting.

    ``` lua
    ['PointsSettings'] = {
		['PointsEnabled'] = true/false;
		['PointsAwarded'] = 0;
	};
    ```

    **['PointsEnabled']** Set to false if you don't want to use the points system.

    **['PointsAwarded']** Only works if the above value is true. Awards this amount of points when they make or complete an order using staff machines (cashiers screen or order board). Recommended value: 1

??? info "Kiosk Settings"


    ``` lua 
    ['KioskSettings'] = {
		['GamepassRequired'] = true/false;
		['GamepassID'] = 00000000;
		['PromptPurchase'] = true/false;
		['OrderCooldown'] = 0; 
	};
    ```
    
    **['GamepassRequired']** If you want customers to have to buy a gamepass to use the kiosk, set this to true.

    **['GamepassID']** If the above value is true, enter the gamepass ID here.A

    **['PromptPurchase']** If a user doesn't own the gamepass required to use the kiosk, should the purchase prompt appear on screen? True if you want to enable this setting.

    **['OrderCooldown']** Cooldown for people on kiosks making orders. 

??? info "Pickup Screen Settings"
    The pickup screen is fit for fast-food style games where customers can see the status of their orders.

    ``` lua
    ['PickupScreenSettings'] = {
		['CompletedOrdersTime'] = 0;
    };
    ```
    **['CompletedOrdersTime']** Set the amount of time a completed order should stay on the screen before clearing. Recommended value: 15

??? info "HR Screen"
    HR gives high ranks the ability to manage and oversee orders through the system.
    ``` lua
    ['hrScreenSettings'] = {
		['GroupID'] = false/000000;
		['MinimumRankEnabled'] = false;
		['MinimumRank'] = 0; 
		['RankTable'] = {10, 11, 16};
    };
	```

    **['GroupID']** Set your group ID here, if you aren't using a group, set to false

    **['MinimumRankEnabled']** Set to false if you want to use a rank table to use the screen.A

    **['MinimumRank']** Only works if MinimumRankEnabled is true. Minimum rank to use HR Screen.

    **['RankTable']** Only works if MinimumRankEnabled is set to false. Enter rank IDs that are allowed to use the HR Screen.
