class Review {
    constructor(text, person, parentNode) {
        this.text = text;
        this.person = person;
        this.parentNode = parentNode;
        this.previous = null;
        this.next = null;
        this.element = this.buildElement();
    }

    buildElement() {
        const element = document.createElement("div");
        element.className = "Review";
        var review = document.createElement("p");
        review.innerText = this.text;
        var signature = document.createElement("h3");
        signature.innerText = this.person;
        element.appendChild(review);
        element.appendChild(signature);
        return element;
    }

    show() {
        this.element.classList.forEach(cls => {
            if(cls == "append" || cls == "remove") {
                this.element.classList.remove(cls)                ;
            }
        })
        setTimeout(() => {
            this.parentNode.appendChild(this.element);
            this.element.classList.add("append");
        }, 1000)
    }

    hide() {
        this.element.classList.forEach(cls => {
            if(cls == "append" || cls == "remove") {
                this.element.classList.remove(cls);
            }
        })
        this.element.classList.add("remove");
        setTimeout(() => {
            this.parentNode.removeChild(this.element);
        }, 950);
    }
}

class Reviews{
    constructor(reviews = [], parentNode) {
        this.current = null;
        this.parentNode = parentNode;
        this.reviews = [];
        this.importReviews(reviews);
    }

    addReview(text, signature) {
        var review = new Review(text, signature, this.parentNode);
        var l = this.reviews.length;
        this.reviews.push(review);
        if (l == 0) {
            this.reviews[l].previous = this.reviews[l];
            this.reviews[l].next = this.reviews[l];
        } else {
            //Adjust first node to point to the last node.
            this.reviews[0].previous = this.reviews[l];
            //Adjust previous node to point to last node.
            this.reviews[l-1].next = this.reviews[l];
            //Adjust current node to point to the first node.
            review.next = this.reviews[0];
            //Adjust current node to point to previous node.
            review.previous = this.reviews[l-1];
        }
    }

    importReviews(reviews) {
        if (reviews.length > 0) {
            let l = 0
            reviews.forEach(review => {
                this.addReview(review.text, review.person);
                l = l + 1;
            });
            this.current = this.reviews[0];
            this.current.show();
        }
    }

    next() {
        this.current.hide("next");
        this.current = this.current.next;
        this.current.show("next");
    }

    previous() {
        this.current.hide("prev");
        this.current = this.current.previous;
        this.current.show("prev");
    }
}

const jsonString = '{"reviews":[{"review":"This is the 1st review","signature":"Signature1"},{"review":"This is the 2nd review","signature":"Signature2"},{"review":"This is the 3rd review","signature":"Signature3"}]}'
const reviewArrayStrings = JSON.parse(jsonString);
const parentNode = document.getElementById("review_panel");
var reviewArray = reviewArrayStrings.reviews.map( review => new Review(review.review, review.signature, parentNode));
const reviews = new Reviews(reviewArray, parentNode);

document.getElementById("prev_review").addEventListener("click", () => reviews.previous());
document.getElementById("next_review").addEventListener("click", () => reviews.next());