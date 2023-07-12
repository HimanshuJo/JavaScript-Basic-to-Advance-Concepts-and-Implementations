// 2296. Design a Text Editor
/*
Design a text editor with a cursor that can do the following:

Add text to where the cursor is.
Delete text from where the cursor is (simulating the backspace key).
Move the cursor either left or right.
When deleting text, only characters to the left of the cursor will be deleted. 
The cursor will also remain within the actual text and cannot be moved beyond it. 

More formally, we have that 0 <= cursor.position <= currentText.length always holds.

Implement the TextEditor class:

TextEditor() Initializes the object with empty text.
void addText(string text) Appends text to where the cursor is. 
The cursor ends to the right of text.

int deleteText(int k) Deletes k characters to the left of the cursor. 
Returns the number of characters actually deleted.

string cursorLeft(int k) Moves the cursor to the left k times. 
Returns the last min(10, len) characters to the left of the cursor, 
where len is the number of characters to the left of the cursor.

string cursorRight(int k) Moves the cursor to the right k times. 
Returns the last min(10, len) characters to the left of the cursor, 
where len is the number of characters to the left of the cursor.
 

Example 1:

Input
["TextEditor", "addText", "deleteText", "addText", "cursorRight", "cursorLeft", 
"deleteText", "cursorLeft", "cursorRight"]
[[], ["leetcode"], [4], ["practice"], [3], [8], [10], [2], [6]]
Output
[null, null, 4, null, "etpractice", "leet", 4, "", "practi"]

Explanation
TextEditor textEditor = new TextEditor(); // The current text is "|". 
(The '|' character represents the cursor)
textEditor.addText("leetcode"); // The current text is "leetcode|".
textEditor.deleteText(4); // return 4
                          // The current text is "leet|". 
                          // 4 characters were deleted.
textEditor.addText("practice"); // The current text is "leetpractice|". 
textEditor.cursorRight(3); // return "etpractice"
                           // The current text is "leetpractice|". 
                           // The cursor cannot be moved beyond the actual text and thus did not move.
                           // "etpractice" is the last 10 characters to the left of the cursor.
textEditor.cursorLeft(8); // return "leet"
                          // The current text is "leet|practice".
                          // "leet" is the last min(10, 4) = 4 characters to the left of the cursor.
textEditor.deleteText(10); // return 4
                           // The current text is "|practice".
                           // Only 4 characters were deleted.
textEditor.cursorLeft(2); // return ""
                          // The current text is "|practice".
                          // The cursor cannot be moved beyond the actual text and thus did not move. 
                          // "" is the last min(10, 0) = 0 characters to the left of the cursor.
textEditor.cursorRight(6); // return "practi"
                           // The current text is "practi|ce".
                           // "practi" is the last min(10, 6) = 6 characters to the left of the cursor.
 

Constraints:

1 <= text.length, k <= 40
text consists of lowercase English letters.
At most 2 * 10^4 calls in total will be made to addText, deleteText, 
cursorLeft and cursorRight.
*/

class Node{
    public val: string;
    public next: Node|null=null;
    public prev: Node|null=null;

    constructor(val: string){
        this.val=val;
    }
}

class TextEditor {
    public dummy: Node=new Node("");
    public node: Node;
    
    constructor() {
        this.node=this.dummy;
    }

    addText(text: string): void {
        let node=null;
        let prev=this.node;
        let next=prev.next;
        for(const ch of text){
            node=new Node(ch);
            node.prev=prev;
            prev.next=node;
            prev=node;
        }
        node.next=next;
        if(next){
            next.prev=node;
        }
        this.node=node;
    }

    deleteText(k: number): number {
        let i=0;
        let next=this.node.next;
        while(i<k&&this.node!=this.dummy){
            this.node=this.node.prev;
            i+=1;
        }
        this.node.next=next;
        if(next){
            next.prev=this.node;
        }
        return i;
    }

    cursorLeft(k: number): string {
        let i=0;
        while(i<k&&this.node.prev!=null&&this.node!=this.dummy){
            this.node=this.node.prev;
            i+=1;
        }
        let node=this.node;
        let t="";
        i=0;
        while(i<10&&node!=null){
            i+=1;
            t=node.val+t;
            node=node.prev;
        }
        return t;
    }

    cursorRight(k: number): string {
        let i=0;
        while(i<k&&this.node.next!=null){
            this.node=this.node.next;
            i+=1;
        }
        let node=this.node;
        let t="";
        i=0;
        while(i<10&&node!=null){
            i+=1;
            t=node.val+t;
            node=node.prev;
        }
        return t;
    }
}

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */