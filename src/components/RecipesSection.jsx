import React, { useState } from 'react';
import { RECIPES } from '../data/recipes';
import { useCart } from '../context/CartContext';
import { Clock, Users, ChefHat, ArrowRight, X, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const RecipesSection = () => {
  const { addToCart, navigateTo } = useCart();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleShopIngredient = (linkedProd) => {
    const fullProd = PRODUCTS.find(p => p.id === linkedProd.id);
    if (fullProd) {
      const variant = fullProd.variants[0];
      addToCart(fullProd, variant, 1, true);
    }
  };

  return (
    <section id="recipes-section" style={{ padding: '5rem 0', backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
              From Pantry to Thali
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.7rem)', color: 'var(--color-forest)' }}>
              Staple Recipes for Everyday Cooking
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
              Culinary blueprints showcasing the aroma and texture of single-origin ingredients.
            </p>
          </div>
        </div>

        {/* 3 Recipe Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              className="recipe-card"
            >
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(23, 63, 44, 0.9)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {recipe.regionalOrigin}
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.76rem', color: 'var(--color-muted)', marginBottom: '0.65rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} /> {recipe.cookTime}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={13} /> {recipe.servings}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                  {recipe.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {recipe.description}
                </p>

                {/* Linked Staples */}
                <div style={{ marginTop: 'auto', backgroundColor: 'var(--color-ivory)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                    Featured Amrit Mati Staples:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {recipe.linkedProducts.map((p) => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--color-forest)', fontWeight: 600 }}>{p.name}</span>
                        <button
                          onClick={() => handleShopIngredient(p)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.15rem 0.45rem',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            color: 'var(--color-forest)'
                          }}
                        >
                          <Plus size={11} />
                          <span>Add Pack (₹{p.price})</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.84rem', padding: '0.65rem' }}
                >
                  <span>View Step-by-Step Cooking Method</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Recipe Modal */}
      {selectedRecipe && (
        <div className="drawer-backdrop" onClick={() => setSelectedRecipe(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '640px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
              padding: '2rem',
              zIndex: 110
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge-pill badge-gold" style={{ marginBottom: '0.5rem' }}>
                  {selectedRecipe.regionalOrigin} • {selectedRecipe.difficulty}
                </span>
                <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest)' }}>
                  {selectedRecipe.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.84rem', color: 'var(--color-muted)', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <span><strong>Prep:</strong> {selectedRecipe.prepTime}</span>
              <span><strong>Cook:</strong> {selectedRecipe.cookTime}</span>
              <span><strong>Yield:</strong> {selectedRecipe.servings}</span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                Required Ingredients
              </h4>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                Cooking Method
              </h4>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
                {selectedRecipe.method.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div style={{ backgroundColor: 'var(--color-ivory)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Cook this with authentic Amrit Mati staples
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                  Fresh harvest batches shipped directly to your kitchen
                </div>
              </div>

              <button
                onClick={() => {
                  selectedRecipe.linkedProducts.forEach(p => handleShopIngredient(p));
                  setSelectedRecipe(null);
                }}
                className="btn-primary"
                style={{ padding: '0.6rem 1.15rem', fontSize: '0.82rem' }}
              >
                <span>Add Ingredients to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .recipe-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
};
