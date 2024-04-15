import { baseUrl } from '../constants/baseUrl'
import { create } from 'zustand'

interface affiliateObject {
  _id: string
  _type: 'stores'
  name: string
  description: string
  address: {
    street: string
    city: string
    state: string
    postal: string
  }
  tags: string[] | null
  header: string
  logo: string
  status: {
    onboarding: boolean
  }
}

interface IAffiliate {
  affiliate: {
    _type: 'stores'
    store_name: string
    email: string
    owner: {
      _ref: string
      _type: 'reference'
    }
    store_description: string
    store_address: {
      street: string
      city: string
      province: string
      postal_code: string
    }
    store_image: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    store_logo: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    store_approval: {
      onboarding: boolean
    }
    tags: string[] | []
  }
  previewHeader: string
  previewLogo: string
  setName: (name: string) => void
  setAffiliateEmail: (name: string) => void
  setDescription: (name: string) => void
  setHeader: (image: string, previewHeader: string) => void
  setLogo: (image: string, previewLogo: string) => void
  setAddress: (address: { street: string; city: string; province: string; postal_code: string }) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  createAffiliate: () => Promise<{
    status: 'CONFIRMED' | 'REJECTED'
    _id: string | null
  }>
  createStore: (owner_id: string) => Promise<{
    status: 'CONFIRMED' | 'REJECTED'
    _id: string | null
  }>
}

export const useNewAffiliate = create<IAffiliate>((set, state) => ({
  affiliate: {
    _type: 'stores',
    store_name: '',
    owner: {
      _ref: '',
      _type: 'reference',
    },
    store_description: '',
    email: '',
    store_address: {
      street: '',
      city: '',
      province: '',
      postal_code: '',
    },
    tags: [],
    store_image: {
      _type: 'image',
      asset: {
        _ref: 'image-e03940f7cdaf37529a5e0baac35d41e8c8ffa4a5-393x316-png',
        _type: 'reference',
      },
    },
    store_logo: {
      _type: 'image',
      asset: {
        _ref: '',
        _type: 'reference',
      },
    },
    store_approval: {
      onboarding: true,
    },
  },
  previewHeader: '',
  previewLogo: '',
  setAffiliateEmail: (email) => {
    console.log(email)
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        email: email,
      },
    }))
  },
  setName: (name) => {
    console.log(name)
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        store_name: name,
      },
    }))
  },
  setDescription: (description) => {
    console.log(description)
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        store_description: description,
      },
    }))
  },
  setHeader: (header, previewHeader) => {
    console.log(header.replace('image-', ''))
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        store_image: {
          _type: 'image',
          asset: {
            _ref: header,
            _type: 'reference',
          },
        },
      },
      previewHeader,
    }))
  },
  setLogo: (logo, previewLogo) => {
    console.log(logo)
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        store_logo: {
          _type: 'image',
          asset: {
            _ref: logo,
            _type: 'reference',
          },
        },
      },
      previewLogo,
    }))
  },
  setAddress: (address) => {
    console.log(address)
    set((state) => ({
      affiliate: {
        ...state.affiliate,
        store_address: address,
      },
    }))
  },
  addTag: (tag) => {
    //* TODO FIX ME: TYPESCRIPT TYPE ERROR
    const isInlist = state().affiliate.tags.includes(tag as never)
    if (isInlist) {
      return
    }
    set(() => ({
      affiliate: { ...state().affiliate, tags: [...state().affiliate.tags, tag] },
    }))
    console.log(state().affiliate.tags)
  },
  removeTag: (tag) => {
    const updatedTags = state().affiliate.tags.filter((oldtags) => oldtags != tag)
    set(() => ({
      affiliate: { ...state().affiliate, tags: updatedTags },
    }))
    console.log(state().affiliate.tags)
  },
  createAffiliate: async () => {
    const affiliate = state().affiliate
    const { email } = affiliate
    const res = await fetch(`${baseUrl}/affiliates/create-affiliate?email=${email}`)
    const data = await res.json()
    console.log(data)
    return data
  },
  createStore: async (owner_id) => {
    const affiliate = state().affiliate

    const { store_name, store_image, store_logo, _type, store_address, store_description, store_approval, tags } =
      affiliate

    const newStore = {
      _type,
      store_name,
      store_address,
      store_description,
      store_approval,
      store_image,
      store_logo,
      store_tags: tags,
      owner: {
        _ref: owner_id,
        _type: 'reference',
      },
    }

    const res = await fetch(`${baseUrl}/stores/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStore),
    })
    const data = await res.json()
    console.log(data)
    return data
  },
}))
