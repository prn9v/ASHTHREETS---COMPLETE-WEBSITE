
'use client'

import { useEffect, useState } from 'react'
import "./ProductCard.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { mens_kurta } from '../../../Data/mens/Kurta/kurta'
import ProductCard from './ProductCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {findProducts} from '../../../State/Product/Action'



const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
    {
        id: "color",
        name: "Colors",
        options: [
          { value: "red", label: "Red", checked: false },
          { value: "blue", label: "Blue", checked: false },
          { value: "green", label: "Green", checked: false },
          { value: "black", label: "Black", checked: false },
          { value: "white", label: "White", checked: false },
        ],
      },
      {
        id: "price",
        name: "Price",
        options: [
            { value: "100-200", label: "₹100 To ₹200", checked: false },
            { value: "200-400", label: "₹200 To ₹400", checked: false },
            { value: "400-600", label: "₹400 To ₹600", checked: false },
            { value: "600-800", label: "₹600 To ₹800", checked: false },
            { value: "800-1000", label: "₹800 To ₹1000", checked: false },
            { value: "1000-1200", label: "₹1000 To ₹1200", checked: false },
            { value: "1200-1400", label: "₹1200 To ₹1400", checked: false },
            { value: "1400-1600", label: "₹1400 To ₹1600", checked: false },
            { value: "1600-1800", label: "₹1600 To ₹1800", checked: false },
            { value: "1800-2000", label: "₹1800 To ₹2000", checked: false },
            { value: "2000-Infinity", label: "Above ₹2000", checked: false },
        ],
      },
      {
        id: "size",
        name: "Sizes",
        options: [
          { value: "S", label: "Small", checked: false },
          { value: "M", label: "Medium", checked: false },
          { value: "L", label: "Large", checked: false },
          { value: "XL", label: "Extra Large", checked: false },
        ],
      },
      {
        id: "availability",
        name: "Availability",
        options: [
          { value: true, label: "In Stock", checked: false },
          { value: false, label: "Out of Stock", checked: false },
        ],
      },
      {
        id: "discountPrice",
        name: "Discount Range",
        options: [
            { value: "100-200", label: "₹100 To ₹200", checked: false },
            { value: "200-400", label: "₹200 To ₹400", checked: false },
            { value: "400-600", label: "₹400 To ₹600", checked: false },
            { value: "600-800", label: "₹600 To ₹800", checked: false },
            { value: "800-1000", label: "₹800 To ₹1000", checked: false },
            { value: "1000-1200", label: "₹1000 To ₹1200", checked: false },
            { value: "1200-1400", label: "₹1200 To ₹1400", checked: false },
            { value: "1400-1600", label: "₹1400 To ₹1600", checked: false },
            { value: "1600-1800", label: "₹1600 To ₹1800", checked: false },
            { value: "1800-2000", label: "₹1800 To ₹2000", checked: false },
        ],
      },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page")||1;
  const stock = searchParams.get("stock");

  const handleFilter = (value, sectionId) => (event) => {
    const searchParams = new URLSearchParams(location.search);

    // Fetch current filter values for the sectionId
    let filterValue = searchParams.get(sectionId);

    // If the checkbox is checked, add the value to the filter
    if (event.target.checked) {
        if (!filterValue) {
            filterValue = value; // First value in the filter
        } else {
            const valuesArray = filterValue.split(",");
            if (!valuesArray.includes(value)) {
                filterValue = [...valuesArray, value].join(","); // Add value to the list
            }
        }
    } else {
        // If unchecked, remove the value
        const valuesArray = filterValue?.split(",").filter((item) => item !== value);
        filterValue = valuesArray.length > 0 ? valuesArray.join(",") : null;
    }

    // Update searchParams or remove filter if it's empty
    if (filterValue) {
        searchParams.set(sectionId, filterValue);
    } else {
        searchParams.delete(sectionId);
    }

    // Update the URL with new query
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
};


  useEffect(()=>{
    const [minPrice,maxPrice] = priceValue === null?[0,10000]:priceValue.split("-").map(Number);

    const data = {
      category: params.levelthree,
      colors: colorValue || [],
      sizes: sizeValue || [],
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price-low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: stock,
    }
    dispatch(findProducts(data))
  },[params.levelthree,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock
  ])
        
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              
              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                
              {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto  px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
              <h1 className=' text-gray-700 font-Bold opacity-50 text-2xl'> Filters </h1>
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                                onChange={handleFilter(option.value, section.id)}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className=' flex flex-wrap justify-center bg-white py-5'>
                    {products.products?.content?.map((item) => <ProductCard key={item.id} product={item} />)}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

