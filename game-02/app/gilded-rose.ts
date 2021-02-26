export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}
// For limit values of quality 
const MAXIMUM_QUALITY = 50
const MINIMUM_QUALITY = 0

// For check current quality 
const isLessThanMaximum = quality => quality < MAXIMUM_QUALITY
const isOverMinimum = quality => quality > MINIMUM_QUALITY

// For a possible modification of current quality
const increaseQuality = quality => isLessThanMaximum(quality) ? quality + 1 : quality
const decreaseQuality = quality => isOverMinimum(quality) ? quality - 1 :  quality 

// For update Aged Brie quality
export const updateQualityForAgedBrie = (item) :Item =>  {
    // For increase quality by 1
    item.quality = increaseQuality(item.quality)
    // For increase or not quality by 2
    item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality
    item.sellIn -= 1;

    return item
}

// For increase Backstage passes quality
const increaseQualityForBackstage = (item: Item): number => {
    // For increase quality by 1
    let quality = increaseQuality(item.quality);
    // For increase or not quality by 2
    quality = item.sellIn < 11 ? increaseQuality(quality) : quality;
    // For increase or not quality by 3
    quality = item.sellIn < 6 ? increaseQuality(quality) : quality;

    return quality
}

// For update Backstage passes quality
export const updateQualityForBackstage = (item) :Item => {
    // For assign or not quality equal 0
    item.quality = item.sellIn === 0 ? 0 : increaseQualityForBackstage(item);    
    item.sellIn -= 1

    return item;
}

// For update Sulfuras quality
export const updateQualityForSulfuras = (item) :Item => {
    // For assign a unique quality
    item.quality = 80;

    return item
}

// For update Conjured quality
export const updateQualityForConjured = (item) :Item => {
    // For Update quality by 2
    item = updateQualityItem(item)
    item = updateQualityItem(item)

    item.sellIn -= 1

    return item
}

// For update quality
const updateQualityItem = (item): Item => {
    item.quality = decreaseQuality(item.quality);
    item.quality = item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality
    
    return item
}

// For update Other items quality
export const updateQualityForOthers = (item) :Item => { 
    item = updateQualityItem(item)
    item.sellIn -= 1

    return item
}

export class GildedRose {
    
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    // For upgrade sellIn & quality according name item
    updateQuality() {
        this.items.forEach(element => {
            switch (element.name){
              case ("Aged Brie"):
                  element = updateQualityForAgedBrie(element);
                  break;
              case (element.name.match(/Backstage passes/) || {}).input:
                  element = updateQualityForBackstage(element);
                  break;
              case (element.name.match(/Conjured/) || {}).input:
                  element = updateQualityForConjured(element);
                  break;
              case (element.name.match(/Sulfuras/) || {}).input:
                  element = updateQualityForSulfuras(element);
                  break;
              default:
                  element = updateQualityForOthers(element);
                  break;
            }
        });
        return this.items;
    }
}