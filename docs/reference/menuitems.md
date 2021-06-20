This script is where you can add the items to your menu. You can add as many catergories or items as you wish. Items will only be added to the game when it has been re-published, and on an updated server. 

??? tip
    Label catergories and items clearly so staff and guests know what each item is.



??? info "Adding a Catergory"

    ``` lua
        {['Catergory name'] = {
            -- Enter menu items here
        }},
    ```
    You can add as many catergories as you wish to make finding foods on the system easier. 

    ??? warning
        Don't forget to close the catergory off otherwise your script will not work.

??? info "Adding a Sub-Catergory"
    Sub-catergories currently are not added.

??? info "Adding an Item"
    
    ``` lua
        {
		['ItemName'] = "",
		['Description'] = "", 
		},
    ```
    Enter this code into your catergory and enter the ItemName inside the speech marks. You can add as many or as little items as you wish. All items must be inside a catergory or the script will error. 
    
    ??? tip 
        Remember that Item Descriptions are optional. If you're entering a description, don't make it too long!