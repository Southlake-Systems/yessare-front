#!/usr/bin/env python3
"""
Product Image URL Collector
Searches for 1 best image per product from stock list
Output: products_with_images.csv
"""

import csv
import time
from ddgs import DDGS
import sys

def read_stock_list(filepath):
    """Read CSV and extract products"""
    products = []
    with open(filepath, 'r', encoding='utf-8') as f:
        # Skip header rows
        for _ in range(4):
            next(f)
        reader = csv.DictReader(f, fieldnames=['No', 'Item Code', 'Item Name', 'Quantity'])
        for row in reader:
            if row['Item Name'] and row['Item Name'].strip() and row['Item Name'] != '':
                products.append({
                    'item_code': row['Item Code'].strip() if row['Item Code'] else '',
                    'item_name': row['Item Name'].strip(),
                })
    return products

def search_image_url(product_name, max_retries=2):
    """Search for best image URL for product"""
    try:
        results = list(DDGS().images(query=product_name, max_results=1))
        if results:
            return results[0]['image']  # Return first/best match URL
    except Exception as e:
        if max_retries > 0:
            time.sleep(1)
            return search_image_url(product_name, max_retries - 1)
        print(f"Error searching '{product_name}': {str(e)}", file=sys.stderr)
    return None

def process_products(products, output_file, start_idx=0):
    """Process products and save with image URLs"""
    total = len(products)

    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['No', 'Item Code', 'Item Name', 'Image URL', 'Status'])

        for idx, product in enumerate(products[start_idx:], start=start_idx + 1):
            item_code = product['item_code']
            item_name = product['item_name']

            print(f"[{idx}/{total}] Searching: {item_name[:50]}...", end=' ', flush=True)

            image_url = search_image_url(item_name)
            status = 'Found' if image_url else 'Not Found'

            print(f"✓ {status}")
            writer.writerow([idx, item_code, item_name, image_url or '', status])

            # Rate limiting - be respectful to the server
            if idx % 50 == 0:
                print(f"  [Progress: {idx}/{total} products processed]")
                time.sleep(2)
            else:
                time.sleep(0.3)

if __name__ == '__main__':
    input_file = 'stock list1.csv'
    output_file = 'products_with_images.csv'

    print("📦 Reading stock list...")
    products = read_stock_list(input_file)
    print(f"✓ Found {len(products)} products\n")

    print("🔍 Searching for images (this may take a while for 10k+ products)...")
    print("   Tip: You can pause with Ctrl+C and resume later\n")

    try:
        process_products(products, output_file)
        print(f"\n✅ Done! Results saved to: {output_file}")
    except KeyboardInterrupt:
        print("\n⏸️  Paused. You can resume by running the script again.")
